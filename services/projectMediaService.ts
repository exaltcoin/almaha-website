import type { ProjectMediaCategory, ProjectMediaType, User, UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { MEDIA_DELETE_ROLES, MEDIA_STAFF_ROLES } from "@/lib/auth/roles";
import { initializePrivateStorage } from "@/lib/storage/provider";
import type { StoredFile } from "@/lib/storage/types";
import { enforceRateLimit } from "@/lib/security/rateLimit";

const MAX_FILES = 10;
const allowedMimeTypes: Record<ProjectMediaType, readonly string[]> = {
  IMAGE: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  VIDEO: ["video/mp4", "video/quicktime", "video/webm"],
  DOCUMENT: ["application/pdf"]
};

const signatures: Record<string, (buffer: Buffer) => boolean> = {
  "image/jpeg": (buffer) => buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])),
  "image/png": (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  "image/webp": (buffer) => buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP",
  "image/heic": (buffer) => isFtyp(buffer, ["heic", "heix", "hevc", "hevx", "mif1"]),
  "image/heif": (buffer) => isFtyp(buffer, ["heif", "heix", "hevc", "hevx", "mif1"]),
  "video/mp4": (buffer) => isFtyp(buffer, ["isom", "iso2", "mp41", "mp42", "avc1", "M4V "]),
  "video/quicktime": (buffer) => isFtyp(buffer, ["qt  "]),
  "video/webm": (buffer) => buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3])),
  "application/pdf": (buffer) => buffer.subarray(0, 5).toString() === "%PDF-"
};

function isFtyp(buffer: Buffer, brands: readonly string[]) {
  return buffer.subarray(4, 8).toString() === "ftyp" && brands.includes(buffer.subarray(8, 12).toString());
}

function maxBytes(mediaType: ProjectMediaType) {
  const name = mediaType === "IMAGE" ? "MAX_IMAGE_UPLOAD_MB" : mediaType === "VIDEO" ? "MAX_VIDEO_UPLOAD_MB" : "MAX_DOCUMENT_UPLOAD_MB";
  const fallback = mediaType === "IMAGE" ? 10 : mediaType === "VIDEO" ? 100 : 20;
  const configured = Number(process.env[name]);
  return (Number.isFinite(configured) && configured > 0 ? configured : fallback) * 1024 * 1024;
}

export function validateMediaBuffer(mediaType: ProjectMediaType, mimeType: string, buffer: Buffer, declaredSize: number) {
  if (!allowedMimeTypes[mediaType]?.includes(mimeType) || !signatures[mimeType]?.(buffer)) {
    throw new MediaValidationError("Unsupported or invalid file type.");
  }
  if (declaredSize !== buffer.length || buffer.length > maxBytes(mediaType)) {
    throw new MediaValidationError("File size is invalid or exceeds the configured limit.");
  }
}

export class MediaValidationError extends Error {}

function safeOriginalName(name: string) {
  const normalized = name.normalize("NFKC").replace(/[\\/\0]/g, "_").trim();
  const base = normalized.split("/").pop()?.slice(0, 180) || "upload";
  return base.replace(/[^a-zA-Z0-9._ -]/g, "_");
}

export async function getProjectForMedia(user: User, projectId: string) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return null;
  const isOwner = project.customerId === user.id;
  const isStaff = MEDIA_STAFF_ROLES.includes(user.role);
  if (!isOwner && !isStaff) throw new MediaAuthorizationError();
  return project;
}

export class MediaAuthorizationError extends Error {
  status = 403;
  constructor() { super("You are not authorized to access this project media."); }
}

function legacyKind(mediaType: ProjectMediaType, category: ProjectMediaCategory) {
  if (mediaType === "DOCUMENT") return "DOCUMENT" as const;
  if (category === "SITE_SURVEY" || category === "MEASUREMENT") return "SURVEY" as const;
  if (category === "FABRICATION") return "FABRICATION" as const;
  if (category === "BEFORE_WORK") return "INSTALLATION_BEFORE" as const;
  if (category === "COMPLETION") return "INSTALLATION_AFTER" as const;
  return "CUSTOMER_UPLOAD" as const;
}

export async function listProjectMedia(user: User, projectId: string) {
  await getProjectForMedia(user, projectId);
  return prisma.projectMedia.findMany({
    where: { projectId, status: "ACTIVE" },
    select: { id: true, projectId: true, mediaType: true, category: true, originalName: true, mimeType: true, sizeBytes: true, caption: true, width: true, height: true, durationSeconds: true, uploadedByUserId: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function uploadProjectMedia(user: User, projectId: string, files: File[], category: ProjectMediaCategory, captions?: string[]) {
  const project = await getProjectForMedia(user, projectId);
  if (!project) throw new MediaNotFoundError();
  if (!files.length || files.length > MAX_FILES) throw new MediaValidationError(`Upload between 1 and ${MAX_FILES} files.`);
  if (user.role === "CUSTOMER" && !["CUSTOMER_REFERENCE", "OTHER"].includes(category)) throw new MediaAuthorizationError();

  const rate = await enforceRateLimit({ namespace: "project-media-upload", identity: user.id, maxAttempts: 20, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) throw new MediaRateLimitError();
  const storage = initializePrivateStorage();
  const storedKeys: string[] = [];
  try {
    const preparedFiles = [];
    for (const [index, file] of files.entries()) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mediaType: ProjectMediaType = file.type.startsWith("image/") ? "IMAGE" : file.type.startsWith("video/") ? "VIDEO" : "DOCUMENT";
      validateMediaBuffer(mediaType, file.type, buffer, file.size);
      preparedFiles.push({ file, buffer, mediaType, caption: captions?.[index]?.trim().slice(0, 500) || null });
    }

    const storedFiles: Array<{ file: File; buffer: Buffer; mediaType: ProjectMediaType; caption: string | null; stored: StoredFile }> = [];
    for (const { file, buffer, mediaType, caption } of preparedFiles) {
      const stored = await storage.upload({ buffer, originalName: safeOriginalName(file.name), contentType: file.type, size: buffer.length, ownerId: project.customerId, category: category.toLowerCase() });
      storedKeys.push(stored.key);
      storedFiles.push({ file, buffer, mediaType, caption, stored });
    }

    return prisma.$transaction(async (transaction) => {
      const created = [];
      for (const { file, buffer, mediaType, caption, stored } of storedFiles) {
        created.push(await transaction.projectMedia.create({ data: { projectId, kind: legacyKind(mediaType, category), mediaType, category, storageKey: stored.key, originalName: safeOriginalName(file.name), fileName: safeOriginalName(file.name), mimeType: file.type, sizeBytes: buffer.length, caption, uploadedBy: user.id, uploadedByUserId: user.id } }));
      }
      return created;
    });
  } catch (error) {
    await Promise.allSettled(storedKeys.map((key) => storage.delete(key)));
    throw error;
  }
}

export async function findProjectMedia(user: User, projectId: string, mediaId: string) {
  await getProjectForMedia(user, projectId);
  const media = await prisma.projectMedia.findFirst({ where: { id: mediaId, projectId, status: "ACTIVE" } });
  if (!media) throw new MediaNotFoundError();
  return media;
}

export async function deleteProjectMedia(user: User, projectId: string, mediaId: string) {
  const media = await findProjectMedia(user, projectId, mediaId);
  const canDelete = MEDIA_DELETE_ROLES.includes(user.role) || (user.role === "CUSTOMER" && media.uploadedByUserId === user.id);
  if (!canDelete) throw new MediaAuthorizationError();
  const deleted = await prisma.projectMedia.update({ where: { id: media.id }, data: { status: "DELETED" } });
  await Promise.allSettled([initializePrivateStorage().delete(media.storageKey)]);
  return deleted;
}

export class MediaNotFoundError extends Error { status = 404; constructor() { super("Media not found."); } }
export class MediaRateLimitError extends Error { status = 429; constructor() { super("Too many uploads. Please try again later."); } }