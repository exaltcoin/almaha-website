import { prisma } from "@/lib/db/prisma";

function year() {
  return new Date().getUTCFullYear();
}

async function nextProjectNumber() {
  const prefix = `AM-ALU-${year()}-`;
  const latest = await prisma.project.findFirst({
    where: { projectNumber: { startsWith: prefix } },
    orderBy: { projectNumber: "desc" },
    select: { projectNumber: true }
  });
  const last = latest ? Number(latest.projectNumber.slice(prefix.length)) : 0;
  return `${prefix}${String(last + 1).padStart(6, "0")}`;
}

export async function createCustomerProject(params: {
  customerId: string;
  title: string;
  description?: string | null;
  projectType?: string | null;
  locale?: string;
}) {
  // Unique DB constraint is the final guard. Retry handles concurrent requests.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.project.create({
        data: {
          projectNumber: await nextProjectNumber(),
          customerId: params.customerId,
          title: params.title,
          description: params.description || null,
          projectType: params.projectType || null,
          locale: params.locale === "ar" ? "ar" : "en"
        }
      });
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
  throw new Error("Unable to create project");
}

export function listCustomerProjects(customerId: string) {
  return prisma.project.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      projectNumber: true,
      title: true,
      projectType: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
}
