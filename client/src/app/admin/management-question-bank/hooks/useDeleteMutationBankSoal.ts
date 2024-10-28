import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

type IUseMutateBankSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useDeleteMutationBankSoal = ({
  onSuccess,
  onError,
}: IUseMutateBankSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string | number }) => {
      const response = await service.sendDeleteRequest(
        `/items/questions_bank/${data.id}`,
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["management-bank-soal"],
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

export default useDeleteMutationBankSoal;
