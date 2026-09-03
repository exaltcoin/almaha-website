import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth/requireUser";
import { writeAuditLog } from "@/lib/audit/audit";
import { requestContext } from "@/lib/security/request";
import { deleteProjectMedia, findProjectMedia, MediaAuthorizationError, MediaNotFoundError } from "@/services/projectMediaService";

export const runtime = "nodejs";

function responseFor(error: unknown) {
  if (error instanceof AuthError || error instanceof MediaAuthorizationError || error instanceof MediaNotFoundError) return NextResponse.json({ ok: false, error: error.message }, { status: error instanceof AuthError ? error.status : error instanceof MediaNotFoundError ? 404 : 403 });
  console.error("Project media item error", error);
  return NextResponse.json({ ok: false }, { status: 500 });
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string; mediaId: string }> }) {
  try {
    const user = await requireUser();
    const { id, mediaId } = await params;
    const media = await findProjectMedia(user, id, mediaId);
    return NextResponse.json({ ok: true, media: { id: media.id, projectId: media.projectId, mediaType: media.mediaType, category: media.category, originalName: media.originalName, mimeType: media.mimeType, sizeBytes: media.sizeBytes, caption: media.caption, width: media.width, height: media.height, durationSeconds: media.durationSeconds, uploadedByUserId: media.uploadedByUserId, createdAt: media.createdAt } });
  } catch (error) { return responseFor(error); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; mediaId: string }> }) {
  try {
    const user = await requireUser();
    const { id, mediaId } = await params;
    const media = await deleteProjectMedia(user, id, mediaId);
    await writeAuditLog({ actorUserId: user.id, action: "PROJECT_MEDIA_DELETED", entityType: "ProjectMedia", entityId: media.id, previousValue: { projectId: media.projectId, storageKey: "private" }, ...requestContext(request) });
    return NextResponse.json({ ok: true });
  } catch (error) { return responseFor(error); }
}