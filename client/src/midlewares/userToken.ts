export const getUserToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_token");
    }
    return null;
  };
  // Function to create (set) the access token in localstorage
  export const setUserToken = (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_token", token);
    }
  };
  // Function to delete (remove) the access token from localstorage
  export const deleteUserToken = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_token");
    }
  };