import { setUserToken } from "@/midlewares/userToken";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";

export const formAuthUser = z.object({
  coupon_code: z.string().min(1, "id is required")
});

interface IAuthToken {
  access_token: string;
  expires: number;
  refresh_token: string;
  full_name:string
}

export type IAuthUserRequest = z.infer<typeof formAuthUser>;

export type IUseAuthUser = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useAuth = ({ onSuccess, onError }: IUseAuthUser) => {
  const service = new DirectusInterceptor();
  return useMutation({
    mutationFn: async (data: IAuthUserRequest) => {
      const response = await service.sendPostRequest("/coupon/login", data);
      return response;
    },
    onSuccess: (response: AxiosResponse<{ data: IAuthToken }>) => {
      setUserToken(response?.data?.data?.access_token)
      localStorage.setItem("refresh_token_user", response?.data?.data?.refresh_token)
      localStorage.setItem("username", response?.data?.data?.full_name)
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

export default useAuth;
