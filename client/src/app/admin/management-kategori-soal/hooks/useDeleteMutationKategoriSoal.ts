import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

type IUseMutateKategoriSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useDeleteMutationKategoriSoal = ({
  onSuccess,
  onError,
}: IUseMutateKategoriSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string | number }) => {
      const response = await service.sendDeleteRequest(
        `/items/kategori_soal/${data.id}`
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kategori-soal"],
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

export default useDeleteMutationKategoriSoal;
