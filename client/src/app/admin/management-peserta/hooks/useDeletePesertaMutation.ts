import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

type IUseMutatePeserta = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useDeletePesertaMutation = ({
  onSuccess,
  onError,
}: IUseMutatePeserta) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string | number }) => {
      const response = await service.sendDeleteRequest(
        `/items/user_session_test/${data.id}`
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-sessions-test"],
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

export default useDeletePesertaMutation;
