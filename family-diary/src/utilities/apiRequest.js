import baseUrl from "./BaseURL";

let csrfToken = null;
let csrfRequest = null;
let refreshRequest = null;
let refreshTimer = null;
let accessTokenExpiresAt = null;
let lastFocusRefresh = 0;
let redirecting = false;

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const LOGIN_URL = `${baseUrl}/auth/login`;
const LOGOUT_URL = `${baseUrl}/auth/logout`;
const REFRESH_URL = `${baseUrl}/auth/refresh`;
const LOGIN_PATH = "/login";

async function readJson(response) {
  try { return await response.clone().json(); } catch { return null; }
}

function scheduleRefresh(expiresAt) {
  accessTokenExpiresAt = Number(expiresAt) || null;
  if (refreshTimer) clearTimeout(refreshTimer);
  if (!accessTokenExpiresAt || typeof window === "undefined") return;

  const delay = Math.max(1000, accessTokenExpiresAt - Date.now() - 60_000);
  refreshTimer = setTimeout(() => {
    refreshSession({ silent: true }).catch(() => {});
  }, delay);
}

function updateSessionFromResponse(data) {
  if (data?.csrfToken) csrfToken = data.csrfToken;
  const expiresAt = data?.data?.accessTokenExpiresAt;
  if (expiresAt) scheduleRefresh(expiresAt);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("family-diary:session-refreshed"));
  }
}

export async function getCsrfToken({ forceRefresh = false } = {}) {
  if (forceRefresh) {
    csrfToken = null;
    csrfRequest = null;
  }
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

async function refreshSession({ silent = false } = {}) {
  if (refreshRequest) return refreshRequest;

  refreshRequest = (async () => {
    try {
      const sendRefreshRequest = async (token) => fetch(REFRESH_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": token
        },
        body: JSON.stringify({})
      });

      let token = await getCsrfToken();
      let response = await sendRefreshRequest(token);
      let data = await readJson(response);

      if (response.status === 403 && String(data?.message || "").toLowerCase().includes("csrf")) {
        token = await getCsrfToken({ forceRefresh: true });
        response = await sendRefreshRequest(token);
        data = await readJson(response);
      }

      if (!response.ok || data?.status !== "success") return false;

      updateSessionFromResponse(data);
      redirecting = false;
      return true;
    } catch {
      return false;
    } finally {
      refreshRequest = null;
    }
  })();

  return refreshRequest;
}

function redirectToLogin() {
  clearCsrfToken();
  if (typeof window === "undefined" || redirecting || window.location.pathname === LOGIN_PATH) return;
  redirecting = true;
  window.location.replace(LOGIN_PATH);
}

export async function apiFetch(url, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const isAuthEndpoint = url === LOGIN_URL || url === LOGOUT_URL || url === REFRESH_URL;
  if (!SAFE_METHODS.has(method)) {
    headers.set("X-CSRF-Token", await getCsrfToken());
  }

  const requestOptions = { ...options, method, headers, credentials: "include" };
  let response = await fetch(url, requestOptions);

  // Recover once from an expired/stale CSRF token without treating every 403 as CSRF.
  if (!SAFE_METHODS.has(method) && response.status === 403) {
    const errorData = await readJson(response);
    if (String(errorData?.message || "").toLowerCase().includes("csrf")) {
      const freshToken = await getCsrfToken({ forceRefresh: true });
      const retryHeaders = new Headers(requestOptions.headers);
      retryHeaders.set("X-CSRF-Token", freshToken);
      response = await fetch(url, { ...requestOptions, headers: retryHeaders });
    }
  }

  if (response.ok && (url === LOGIN_URL || url === LOGOUT_URL)) {
    const data = await readJson(response);
    if (url === LOGIN_URL) {
      updateSessionFromResponse(data);
    } else {
      clearCsrfToken();
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = null;
      accessTokenExpiresAt = null;
    }
    return response;
  }

  if (response.status === 401 && !isAuthEndpoint) {
    const refreshed = await refreshSession({ silent: false });

    if (refreshed) {
      const retryHeaders = new Headers(requestOptions.headers);
      if (!SAFE_METHODS.has(method) && csrfToken) {
        retryHeaders.set("X-CSRF-Token", csrfToken);
      }
      response = await fetch(url, {
        ...requestOptions,
        headers: retryHeaders,
        credentials: "include"
      });
    } else {
      redirectToLogin();
    }
  }

  return response;
}

export function clearCsrfToken() {
  csrfToken = null;
  csrfRequest = null;
}

// Refresh the session when a suspended/background tab becomes active again.
if (typeof window !== "undefined") {
  const refreshOnReturn = () => {
    if (document.visibilityState === "hidden") return;
    if (Date.now() - lastFocusRefresh < 30_000) return;
    lastFocusRefresh = Date.now();

    const isDue = !accessTokenExpiresAt || accessTokenExpiresAt - Date.now() <= 60_000;
    if (isDue) refreshSession({ silent: true }).catch(() => {});
  };

  window.addEventListener("focus", refreshOnReturn);
  document.addEventListener("visibilitychange", refreshOnReturn);

  // Restores an existing session after a full page reload.
  refreshSession({ silent: true }).catch(() => {});
}




























// import baseUrl from "./BaseURL";

// let csrfToken = null;
// let csrfRequest = null;
// const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

// async function readJson(response) {
//   try { return await response.clone().json(); } catch { return null; }
// }

// export async function getCsrfToken({ forceRefresh = false } = {}) {
//   if (forceRefresh) { csrfToken = null; csrfRequest = null; }
//   if (csrfToken) return csrfToken;
//   if (csrfRequest) return csrfRequest;

//   csrfRequest = (async () => {
//     const response = await fetch(`${baseUrl}/auth/csrf`, {
//       method: "GET",
//       credentials: "include",
//       headers: { Accept: "application/json" },
//     });
//     const data = await readJson(response);
    
//     if (!response.ok || !data?.data?.csrfToken) {
//       throw new Error(data?.message || "Unable to establish a secure connection. Please try again.");
//     }
//     csrfToken = data.data.csrfToken;
//     return csrfToken;
//   })();

//   try { return await csrfRequest; }
//   finally { csrfRequest = null; }
// }

// export async function apiFetch(url, options = {}) {
//   const method = (options.method || "GET").toUpperCase();
//   const headers = new Headers(options.headers || {});
//   headers.set("Accept", "application/json");

//   const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
//   if (options.body && !isFormData && !headers.has("Content-Type")) {
//     headers.set("Content-Type", "application/json");
//   }

//   if (!SAFE_METHODS.has(method)) {
//     headers.set("X-CSRF-Token", await getCsrfToken());
//   }

//   const response = await fetch(url, {
//     ...options, method, headers, credentials: "include",
//   });

//   if (response.ok && (url.endsWith("/auth/login") || url.endsWith("/auth/logout"))) {
//     const data = await readJson(response);
//     if (data?.csrfToken) csrfToken = data.csrfToken;
//   }
//   return response;
// }

// export function clearCsrfToken() {
//   csrfToken = null;
//   csrfRequest = null;
// }



