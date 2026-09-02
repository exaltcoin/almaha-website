import { NextRequest, NextResponse } from "next/server";
import { AuthError, requireUser } from "@/lib/auth/requireUser";
import { createCustomerProject, listCustomerProjects } from "@/services/projectService";
import { writeAuditLog } from "@/lib/audit/audit";
import { requestContext } from "@/lib/security/request";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser(["CUSTOMER"]);
    return NextResponse.json({ ok: true, projects: await listCustomerProjects(user.id) });
  } catch (error) {
    if (error instanceof AuthError) return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser(["CUSTOMER"]);
    const data = await req.json();
    const title = String(data.title || "").trim();
    if (!title || title.length > 160) return NextResponse.json({ ok: false, error: "Invalid project title" }, { status: 400 });

    const project = await createCustomerProject({
      customerId: user.id,
      title,
      projectType: String(data.projectType || "").trim().slice(0, 120) || null,
      description: String(data.description || "").trim().slice(0, 5000) || null,
      locale: String(data.locale || "en")
    });

    await writeAuditLog({
      actorUserId: user.id,
      action: "PROJECT_CREATED",
      entityType: "Project",
      entityId: project.id,
      newValue: { projectNumber: project.projectNumber, status: project.status },
      ...requestContext(req)
    });
    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    console.error("Project create error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
