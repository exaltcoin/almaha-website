import { API_BASE_URL } from "../config/api";
import { getSessionToken } from "../auth/secureSession";

type ApiRequestOptions = RequestInit & {
  authenticated?: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { authenticated = true, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (authenticated) {
    const token = await getSessionToken();

    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...requestOptions,
    headers: requestHeaders
  });

  const contentType = response.headers.get("content-type") || "";

  let data: unknown = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = text || null;
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    if (
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error?: unknown }).error === "string"
    ) {
      message = (data as { error: string }).error;
    }

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}