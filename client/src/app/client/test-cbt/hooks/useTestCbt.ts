import {create} from "zustand";

interface TestCbtState {
  sessionData: any;
  auth: string;
  refreshToken: string;
  removeAuth: () => void;
  setAuth: (item: any) => void;
  setSessionData : (item:any)=>void
}

export const useTestCbt = create<TestCbtState>((set: Function) => ({
    sessionData: true,
  auth: "",
  refreshToken: "",
  removeAuth: () => set({ auth: "", expireTime: 0 }),
  setAuth: (item: any) =>
    set({ auth: item.access_token, refreshToken: item.refresh_token }),
  setSessionData: (newValue) => set({ sessionData: newValue }),
}));
