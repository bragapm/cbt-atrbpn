const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = `${ACCESS_TOKEN_KEY}_refresh`;
const EXPIRES_AT_KEY = `${ACCESS_TOKEN_KEY}_expires_at`;

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

export const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

export const setRefreshToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

// `expires` dari Directus adalah durasi dalam milidetik, bukan timestamp.
// Disimpan sebagai waktu kedaluwarsa absolut supaya bisa dicek langsung.
export const setTokenExpiresAt = (expiresInMs: number): void => {
  if (typeof window !== "undefined" && expiresInMs) {
    localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + expiresInMs));
  }
};

export const getTokenExpiresAt = (): number | null => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(EXPIRES_AT_KEY);
    return value ? Number(value) : null;
  }
  return null;
};

export const setAuthSession = (session: {
  access_token: string;
  refresh_token?: string;
  expires?: number;
}): void => {
  setAccessToken(session.access_token);
  if (session.refresh_token) {
    setRefreshToken(session.refresh_token);
  }
  if (session.expires) {
    setTokenExpiresAt(session.expires);
  }
};

export const deleteAccessToken = (): void => {
  if (typeof window !== "undefined") {
    if(localStorage.getItem(ACCESS_TOKEN_KEY)){
      window.location.href = "/";
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.clear()
  }
};
