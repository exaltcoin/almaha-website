import type { PrivateStorageProvider, ReadStoredFile, StoredFile, UploadFileInput } from "./types";

export class S3PrivateStorageProvider implements PrivateStorageProvider {
  constructor() {
    if (!process.env.S3_BUCKET || !process.env.S3_REGION || !process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY) {
      throw new Error("S3 private storage requires S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY.");
    }
  }

  async upload(_input: UploadFileInput): Promise<StoredFile> { throw new Error("S3 private storage adapter is not installed."); }
  async delete(_key: string): Promise<void> { throw new Error("S3 private storage adapter is not installed."); }
  async read(_key: string): Promise<ReadStoredFile> { throw new Error("S3 private storage adapter is not installed."); }
  async getSignedDownloadUrl(_key: string, _expiresInSeconds = 300): Promise<string> { throw new Error("S3 private storage adapter is not installed."); }
}