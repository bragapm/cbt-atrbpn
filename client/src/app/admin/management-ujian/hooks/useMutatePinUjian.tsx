import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IBaseResponse } from "@/types/base-response";

type IPinRequest = {
  session_id: string | number;
};

type IUserSessionRequest = {
  PIN: string;
};

export type IPin = {
  pin: string;
};

type IUseMutateUjian = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutatePinUjian = ({ onSuccess, onError }: IUseMutateUjian) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IPinRequest) => {
      const response = await service.sendPostRequest<IPinRequest, IPin>(
        "/generate-pin",
        data
      );

      //Update Session Test with Pin
      const userSessionResponse = await service.sendPatchRequest<
        IUserSessionRequest,
        IBaseResponse<IUserSessionRequest>
      >(`/items/session_test/${data.session_id}`, {
        PIN: response.data.pin,
      });
      console.log({ userSessionResponse });

      return response?.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["generate-pin-ujian"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutatePinUjian;
