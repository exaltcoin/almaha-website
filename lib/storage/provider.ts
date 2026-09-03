import { LocalPrivateStorageProvider } from "./localPrivateStorage";
import { S3PrivateStorageProvider } from "./s3PrivateStorage";
import {
  getPrivateStorageProvider,
  setPrivateStorageProvider,
} from "./storage";
import type { PrivateStorageProvider } from "./types";

let initialized = false;

export function initializePrivateStorage(): PrivateStorageProvider {
  if (initialized) {
    return getPrivateStorageProvider();
  }

  const providerName =
    process.env.PRIVATE_STORAGE_PROVIDER?.trim().toLowerCase();

  if (providerName === "local") {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Local private storage provider must not be used in production."
      );
    }

    setPrivateStorageProvider(
      new LocalPrivateStorageProvider()
    );

    initialized = true;

    return getPrivateStorageProvider();
  }

  if (providerName === "s3" || providerName === "r2") {
    setPrivateStorageProvider(new S3PrivateStorageProvider());
    initialized = true;
    return getPrivateStorageProvider();
  }

  throw new Error(
    "PRIVATE_STORAGE_PROVIDER is not configured."
  );
}
