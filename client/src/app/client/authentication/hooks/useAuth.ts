import create from "zustand";

interface AuthState {
  auth: string;
  expireTime: number;
  removeAuth: () => void;
  setAuth: (item: any) => void;
}

export const useAuth = create<AuthState>((set: Function) => ({
  auth: "",
  expireTime: 0,
  removeAuth: () => set({ auth: "", expireTime: 0 }),
  setAuth: (item: any) =>
    set({ auth: item.access_token, expireTime: item.expires })
}));
