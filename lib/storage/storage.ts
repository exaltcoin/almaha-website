import type {
  PrivateStorageProvider,
  StoredFile,
  UploadFileInput,
} from "./types";

class UnconfiguredPrivateStorageProvider
  implements PrivateStorageProvider
{
  async upload(_input: UploadFileInput): Promise<StoredFile> {
    throw new Error(
      "Private storage provider is not configured."
    );
  }

  async delete(_key: string): Promise<void> {
    throw new Error(
      "Private storage provider is not configured."
    );
  }

  async getSignedDownloadUrl(
    _key: string,
    _expiresInSeconds = 300
  ): Promise<string> {
    throw new Error(
      "Private storage provider is not configured."
    );
  }
}

let provider: PrivateStorageProvider =
  new UnconfiguredPrivateStorageProvider();

export function setPrivateStorageProvider(
  nextProvider: PrivateStorageProvider
): void {
  provider = nextProvider;
}

export function getPrivateStorageProvider(): PrivateStorageProvider {
  return provider;
}
