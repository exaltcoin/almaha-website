"use client";

import { useRef, useState } from "react";

type MediaItem = { id: string; mediaType: "IMAGE" | "VIDEO" | "DOCUMENT"; originalName: string; mimeType: string; sizeBytes: number; caption?: string | null };

export function ProjectMediaSection({ projectId, initialMedia = [] }: { projectId: string; initialMedia?: MediaItem[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState(initialMedia);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); setError("");
    const form = new FormData();
    Array.from(files).forEach((file) => form.append("files", file));
    form.set("category", "CUSTOMER_REFERENCE");
    try {
      const response = await fetch(`/api/projects/${projectId}/media`, { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      setMedia((current) => [...result.media, ...current]);
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Upload failed."); }
    finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  return <section aria-labelledby="project-media-heading">
    <div>
      <h2 id="project-media-heading">Project media</h2>
      <p>Share photos or videos related to this project.</p>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm" multiple hidden onChange={(event) => upload(event.target.files)} />
      <button type="button" disabled={busy} onClick={() => inputRef.current?.click()}>{busy ? "Uploading..." : "Upload photos or videos"}</button>
      {error && <p role="alert">{error}</p>}
    </div>
    {media.length === 0 ? <p>No project media yet.</p> : <div>
      {media.map((item) => <article key={item.id}>
        {item.mediaType === "VIDEO" ? <video controls preload="metadata" src={`/api/projects/${projectId}/media/${item.id}/download`} /> : item.mediaType === "IMAGE" ? <img src={`/api/projects/${projectId}/media/${item.id}/download`} alt={item.caption || item.originalName} /> : <a href={`/api/projects/${projectId}/media/${item.id}/download`}>{item.originalName}</a>}
        <p>{item.originalName} · {(item.sizeBytes / 1024 / 1024).toFixed(1)} MB</p>
      </article>)}
    </div>}
  </section>;
}