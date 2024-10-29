import { DirectusInterceptor } from "@/services/directus-interceptors";
import { setAccessToken } from "@/midlewares/token";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { z } from "zod";
// import { useNavigate } from "react-router-dom";

export const formAuthUser = z.object({
  id: z.string().min(1, "id is required")
});

interface IAuthToken {
  access_token: string;
  expires: number;
  refresh_token: string;
}

export type IAuthUserRequest = z.infer<typeof formAuthUser>;

export type IUseAuthUser = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useAuth = ({ onSuccess, onError }: IUseAuthUser) => {
  const service = new DirectusInterceptor();
  // const navigation = useNavigate();
  return useMutation({
    mutationFn: async (data: IAuthUserRequest) => {
      const response = await service.sendPostRequest("/coupon/login", data);
      return response;
    },
    onSuccess: (response: AxiosResponse<{ data: IAuthToken }>) => {
      setAccessToken(response?.data?.data?.access_token);
      // navigation("/exam");
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";
      onError?.(errorMessage);
    },
  });
};

export default useAuth;
