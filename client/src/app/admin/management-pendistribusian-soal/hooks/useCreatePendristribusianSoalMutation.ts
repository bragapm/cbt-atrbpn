import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CreatePendistribusianSoal } from "../types";

type IUseMutatePendristribusianSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useCreatePendistribusianSoalMutation = ({
  onSuccess,
  onError,
}: IUseMutatePendristribusianSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePendistribusianSoal[]) => {
      const response = await service.sendPostRequest(
        "/items/distribusi_soal",
        data
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pendistribusian-soal"],
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

export default useCreatePendistribusianSoalMutation;
