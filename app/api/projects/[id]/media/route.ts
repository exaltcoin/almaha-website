import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth/requireUser";
import { writeAuditLog } from "@/lib/audit/audit";
import { requestContext } from "@/lib/security/request";
import { ProjectMediaCategory } from "@prisma/client";
import { getProjectForMedia, listProjectMedia, MediaAuthorizationError, MediaNotFoundError, MediaRateLimitError, MediaValidationError, uploadProjectMedia } from "@/services/projectMediaService";

export const runtime = "nodejs";

function errorResponse(error: unknown) {
  if (error instanceof AuthError || error instanceof MediaAuthorizationError || error instanceof MediaNotFoundError || error instanceof MediaRateLimitError || error instanceof MediaValidationError) {
    return NextResponse.json({ ok: false, error: error.message }, { status: error instanceof MediaRateLimitError ? 429 : error instanceof MediaValidationError ? 400 : error instanceof MediaNotFoundError ? 404 : error instanceof AuthError ? error.status : 403 });
  }
  console.error("Project media error", error);
  return NextResponse.json({ ok: false, error: "Unable to process project media." }, { status: 500 });
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    return NextResponse.json({ ok: true, media: await listProjectMedia(user, id) });
  } catch (error) { return errorResponse(error); }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    await getProjectForMedia(user, id);
    const form = await request.formData();
    const categoryValue = String(form.get("category") || "OTHER").toUpperCase();
    if (!Object.values(ProjectMediaCategory).includes(categoryValue as ProjectMediaCategory)) throw new MediaValidationError("Invalid media category.");
    const files = form.getAll("files").filter((value): value is File => value instanceof File);
    if (!files.length) {
      const single = form.get("file");
      if (single instanceof File) files.push(single);
    }
    const captions = form.getAll("caption").map(String);
    const media = await uploadProjectMedia(user, id, files, categoryValue as ProjectMediaCategory, captions);
    const publicMedia = media.map((item) => ({
      id: item.id,
      projectId: item.projectId,
      mediaType: item.mediaType,
      category: item.category,
      originalName: item.originalName,
      mimeType: item.mimeType,
      sizeBytes: item.sizeBytes,
      caption: item.caption,
      width: item.width,
      height: item.height,
      durationSeconds: item.durationSeconds,
      uploadedByUserId: item.uploadedByUserId,
      createdAt: item.createdAt
    }));
    await writeAuditLog({ actorUserId: user.id, action: user.role === "CUSTOMER" ? "PROJECT_MEDIA_UPLOADED" : "ADMIN_MEDIA_UPLOADED", entityType: "ProjectMedia", entityId: id, newValue: { count: media.length, mediaIds: media.map((item) => item.id) }, ...requestContext(request) });
    return NextResponse.json({ ok: true, media: publicMedia }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}