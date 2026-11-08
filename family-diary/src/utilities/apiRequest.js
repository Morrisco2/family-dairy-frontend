import baseUrl from "./BaseURL";

let csrfToken = null;
let csrfRequest = null;
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

async function readJson(response) {
  try { return await response.clone().json(); } catch { return null; }
}

export async function getCsrfToken({ forceRefresh = false } = {}) {
  if (forceRefresh) { csrfToken = null; csrfRequest = null; }
  if (csrfToken) return csrfToken;
  if (csrfRequest) return csrfRequest;

  csrfRequest = (async () => {
    const response = await fetch(`${baseUrl}/auth/csrf`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    const data = await readJson(response);
    
    if (!response.ok || !data?.data?.csrfToken) {
      throw new Error(data?.message || "Unable to establish a secure connection. Please try again.");
    }
    csrfToken = data.data.csrfToken;
    return csrfToken;
  })();

  try { return await csrfRequest; }
  finally { csrfRequest = null; }
}

export async function apiFetch(url, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!SAFE_METHODS.has(method)) {
    headers.set("X-CSRF-Token", await getCsrfToken());
  }

  const response = await fetch(url, {
    ...options, method, headers, credentials: "include",
  });

  if (response.ok && (url.endsWith("/auth/login") || url.endsWith("/auth/logout"))) {
    const data = await readJson(response);
    if (data?.csrfToken) csrfToken = data.csrfToken;
  }
  return response;
}

export function clearCsrfToken() {
  csrfToken = null;
  csrfRequest = null;
}
