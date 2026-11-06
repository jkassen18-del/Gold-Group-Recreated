/**
 * Tiny fetch wrapper used by the "live" adapters. Adds JSON handling, a bearer
 * token and basic error normalisation. Keep it dependency-free.
 */

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function http<T>(
  base: string,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  if (!base) throw new ApiError(0, 'No API base URL configured');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${base}${path}`, { ...init, headers });
  const text = await res.text();
  const body = text ? safeJson(text) : undefined;

  if (!res.ok) {
    const message =
      (body && (body.message || body.error)) || `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }
  return body as T;
}

function safeJson(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
