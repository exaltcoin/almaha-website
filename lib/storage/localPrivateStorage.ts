import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

import type {
  PrivateStorageProvider,
  ReadStoredFile,
  StoredFile,
  UploadFileInput,
} from "./types";

const PRIVATE_STORAGE_ROOT =
  process.env.PRIVATE_STORAGE_ROOT ||
  path.join(process.cwd(), ".private-storage");

function sanitizeSegment(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
}

function resolveStoragePath(key: string): string {
  const root = path.resolve(PRIVATE_STORAGE_ROOT);
  const target = path.resolve(root, key);

  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error("Invalid private storage key.");
  }

  return target;
}

export class LocalPrivateStorageProvider
  implements PrivateStorageProvider
{
  async upload(input: UploadFileInput): Promise<StoredFile> {
    const ownerId = sanitizeSegment(input.ownerId);
    const category = sanitizeSegment(input.category);
    const extension = path.extname(input.originalName).toLowerCase();
    const fileId = crypto.randomUUID();

    const key = path
      .join(ownerId, category, `${fileId}${extension}`)
      .replace(/\\/g, "/");

    const targetPath = resolveStoragePath(key);

    await fs.mkdir(path.dirname(targetPath), {
      recursive: true,
    });

    await fs.writeFile(targetPath, input.buffer, {
      flag: "wx",
    });

    return {
      key,
      originalName: input.originalName,
      contentType: input.contentType,
      size: input.size,
      visibility: "private",
    };
  }

  async delete(key: string): Promise<void> {
    const targetPath = resolveStoragePath(key);

    try {
      await fs.unlink(targetPath);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return;
      }

      throw error;
    }
  }

  async read(key: string): Promise<ReadStoredFile> {
    const targetPath = resolveStoragePath(key);
    return { content: await fs.readFile(targetPath) };
  }

  async getSignedDownloadUrl(
    _key: string,
    _expiresInSeconds = 300
  ): Promise<string> {
    throw new Error(
      "Signed download URLs are not supported by the local private storage provider."
    );
  }
}
