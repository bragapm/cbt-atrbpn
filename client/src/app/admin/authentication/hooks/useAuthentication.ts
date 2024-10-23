import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { IAuthenticationRequest, IAuthToken } from "../types/auth.type";
import { setAccessToken } from "@/midlewares/token";

type IUseAuthentication = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useAuthentication = ({ onSuccess, onError }: IUseAuthentication) => {
  const service = new DirectusInterceptor();
  const navigation = useNavigate();

  return useMutation({
    mutationFn: async (data: IAuthenticationRequest) => {
      const response = await service.sendPostRequest("/auth/login", data);

      return response;
    },

    onSuccess: (response: AxiosResponse<{ data: IAuthToken }>) => {
      setAccessToken(response?.data?.data?.access_token);
      navigation("/");
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useAuthentication;
