const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

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

export const deleteAccessToken = (): void => {
  if (typeof window !== "undefined") {
    if(localStorage.getItem(ACCESS_TOKEN_KEY)){
      window.location.href = "/";
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.clear()
  }
};
