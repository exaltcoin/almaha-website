export type StorageVisibility = "private";

export interface StoredFile {
  key: string;
  originalName: string;
  contentType: string;
  size: number;
  visibility: StorageVisibility;
}

export interface UploadFileInput {
  buffer: Buffer;
  originalName: string;
  contentType: string;
  size: number;
  ownerId: string;
  category: string;
}

export interface ReadStoredFile {
  content: Buffer;
  contentType?: string;
}

export interface PrivateStorageProvider {
  upload(input: UploadFileInput): Promise<StoredFile>;

  delete(key: string): Promise<void>;

  read(key: string): Promise<ReadStoredFile>;

  getSignedDownloadUrl(
    key: string,
    expiresInSeconds?: number
  ): Promise<string>;
}
