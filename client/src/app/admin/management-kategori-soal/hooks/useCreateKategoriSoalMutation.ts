import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CreateQuestionCategoryFormValue } from "../types";

type IUseMutateQuestionCategory = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useCreateKategoriSoalMutation = ({
  onSuccess,
  onError,
}: IUseMutateQuestionCategory) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionCategoryFormValue[]) => {
      const response = await service.sendPostRequest(
        "/items/kategori_soal",
        data
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kategory-soal"],
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

export default useCreateKategoriSoalMutation;