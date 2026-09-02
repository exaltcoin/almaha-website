import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { AuthError, requireUser } from "@/lib/auth/requireUser";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser(["CUSTOMER"]);
    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: { id, customerId: user.id },
      include: {
        items: true,
        media: {
          select: {
            id: true,
            kind: true,
            fileName: true,
            mimeType: true,
            sizeBytes: true,
            createdAt: true
          }
        },
        address: true
      }
    });

    if (!project) {
      return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, project });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
