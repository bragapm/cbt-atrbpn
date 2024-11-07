import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CreatePendistribusianSoal } from "../types";

type IUseMutatePendistribusianSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useUpdatePendisribusianSoalMutation = (
  id: string,
  { onSuccess, onError }: IUseMutatePendistribusianSoal
) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CreatePendistribusianSoal>) => {
      const response = await service.sendPatchRequest(
        `/items/distribusi_soal/${id}`,
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

export default useUpdatePendisribusianSoalMutation;
