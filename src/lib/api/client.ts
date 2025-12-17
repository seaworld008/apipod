export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_BASE_URL?.replace(/\/+$/, "") ?? "";
}

export async function apiGetJson<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  const url = base ? `${base}${path}` : path;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

