import { DirectusInterceptor } from "@/services/directus-interceptors";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";

export const formPinUser = z.object({
    user_session_id: z.string(),
    pin: z.string().min(1, "PIN Wajib Diisi")
});

interface IAuthToken {
  access_token: string;
  expires: number;
  refresh_token: string;
}

export type IPINRequest = z.infer<typeof formPinUser>;

export type IPINAuthUser = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const usePin = ({ onSuccess, onError }: IPINAuthUser) => {
  const service = new DirectusInterceptor();
  return useMutation({
    mutationFn: async (data: IPINRequest) => {
      const response = await service.sendPostRequest("/user-session-tests/start", data);
      return response;
    },
    onSuccess: (response: AxiosResponse<{ data: IAuthToken }>) => {
    //   setUserToken(response?.data?.data?.access_token)
    //   localStorage.setItem("refresh_token_user", response?.data?.data?.refresh_token)
      onSuccess?.();
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response.data?.message ?? "Coba Sesaat Lagi";
        console.log(errorMessage)
      onError?.(errorMessage);
    },
  });
};

export default usePin;
