const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

// Function to get the access token from sessionStorage
export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

// Function to create (set) the access token in sessionStorage
export const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

// Function to delete (remove) the access token from sessionStorage
export const deleteAccessToken = (): void => {
  if (typeof window !== "undefined") {
    if(sessionStorage.getItem(ACCESS_TOKEN_KEY)){
      window.location.href = "/";
    }
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
