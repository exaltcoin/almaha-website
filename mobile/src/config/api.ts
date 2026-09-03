const rawApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

if (!rawApiUrl) {
  throw new Error("EXPO_PUBLIC_API_URL is not configured");
}

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");