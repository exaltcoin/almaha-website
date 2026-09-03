import { apiRequest } from "../api/client";
export type Project = {
	id: string;
	projectNumber?: string;
	title: string;
	projectType?: string | null;
	description?: string | null;
	status: string;
	createdAt: string;
	media?: ProjectMedia[];
};
export type ProjectMedia = {
	id: string;
	projectId: string;
	mediaType: string;
	category: string;
	originalName: string;
	mimeType: string;
	sizeBytes: number;
	caption?: string | null;
	width?: number | null;
	height?: number | null;
	durationSeconds?: number | null;
	uploadedByUserId?: string | null;
	createdAt: string;
};

export async function listProjects() {
	return (await apiRequest<{ ok: true; projects: Project[] }>("/api/projects"))
		.projects;
}

export async function getProject(id: string) {
	return (await apiRequest<{ ok: true; project: Project }>(`/api/projects/${id}`))
		.project;
}

export async function createProject(input: {
	title: string;
	projectType: string;
	description: string;
}) {
	return (
		await apiRequest<{ ok: true; project: Project }>("/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...input, locale: "en" })
		})
	).project;
}

export async function uploadProjectMedia(
	projectId: string,
	assets: { uri: string; name: string; type: string }[],
	category = "OTHER"
) {
	const form = new FormData();
	form.append("category", category);
	assets.forEach((asset) =>
		form.append(
			"files",
			{ uri: asset.uri, name: asset.name, type: asset.type } as unknown as Blob
		)
	);

	return (
		await apiRequest<{ ok: true; media: ProjectMedia[] }>(
			`/api/projects/${projectId}/media`,
			{ method: "POST", body: form }
		)
	).media;
}

export async function deleteProjectMedia(projectId: string, mediaId: string) {
	await apiRequest(`/api/projects/${projectId}/media/${mediaId}`, {
		method: "DELETE"
	});
}