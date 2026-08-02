import { getRefreshToken, setAuthSession } from "@/midlewares/token";
import axios from "axios";

interface IRefreshResponse {
  data: {
    access_token: string;
    expires: number;
    refresh_token: string;
  };
}

// Endpoint yang tidak boleh memicu refresh — kalau ini yang gagal, memang
// kredensialnya yang bermasalah, bukan access token yang kedaluwarsa.
const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/coupon/login",
  "/coupon/logout",
];

// Satu proses refresh dipakai bersama, supaya beberapa request yang kena 401
// bersamaan tidak menembak /auth/refresh berkali-kali. Refresh token Directus
// bersifat rotating: pemakaian kedua dengan token lama pasti ditolak.
let pendingRefresh: Promise<string> | null = null;

const requestNewToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token tidak tersedia");
  }

  // Pakai axios polos supaya tidak masuk kembali ke interceptor.
  const { data } = await axios.post<IRefreshResponse>(
    `${import.meta.env.VITE_DIRECTUS_PUBLIC_URL}/auth/refresh`,
    { refresh_token: refreshToken, mode: "json" }
  );

  const session = data?.data;

  if (!session?.access_token) {
    throw new Error("Respon refresh token tidak valid");
  }

  setAuthSession(session);

  return session.access_token;
};

export const refreshAccessToken = (): Promise<string> => {
  if (!pendingRefresh) {
    pendingRefresh = requestNewToken().finally(() => {
      pendingRefresh = null;
    });
  }

  return pendingRefresh;
};

export const hasRefreshToken = (): boolean => Boolean(getRefreshToken());

export const isAuthEndpoint = (url?: string): boolean =>
  Boolean(url) && AUTH_ENDPOINTS.some((endpoint) => url!.includes(endpoint));
