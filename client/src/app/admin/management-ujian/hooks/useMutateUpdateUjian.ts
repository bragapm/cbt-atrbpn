import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  IUjian,
  IUjianRequest,
  IUserSessionTest,
  IUserSessionTestRequest,
} from "@/types/collection/ujian.type";
import { IBaseResponse } from "@/types/base-response";

type IUseMutateUjian = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateUpdateUjian = ({ onSuccess, onError }: IUseMutateUjian) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUjianRequest) => {
      // Update sesi ujian
      const response = await service.sendPatchRequest<
        IUjianRequest,
        IBaseResponse<IUjian>
      >(`/items/session_test/${data.id}`, data);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["management-ujian"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutateUpdateUjian;
