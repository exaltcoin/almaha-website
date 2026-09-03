import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/requireUser";
import { initializePrivateStorage } from "@/lib/storage/provider";
import { findProjectMedia, MediaAuthorizationError, MediaNotFoundError } from "@/services/projectMediaService";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string; mediaId: string }> }) {
  try {
    const user = await requireUser();
    const { id, mediaId } = await params;
    const media = await findProjectMedia(user, id, mediaId);
    const stored = await initializePrivateStorage().read(media.storageKey);
    return new NextResponse(stored.content as BodyInit, { headers: { "Content-Type": media.mimeType, "Content-Length": String(media.sizeBytes), "Content-Disposition": `inline; filename="${media.originalName.replace(/"/g, "")}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    if (error instanceof AuthError || error instanceof MediaAuthorizationError || error instanceof MediaNotFoundError) return NextResponse.json({ ok: false, error: error.message }, { status: error instanceof AuthError ? error.status : error instanceof MediaNotFoundError ? 404 : 403 });
    console.error("Private media download error", error);
    return NextResponse.json({ ok: false }, { status: 404 });
  }
}