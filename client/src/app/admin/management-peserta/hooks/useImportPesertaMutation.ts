import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ImportPesertaCBTFormValue } from "../types";

type IUseImportPesertaMutate = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useImportPesertaMutation = ({
  onSuccess,
  onError,
}: IUseImportPesertaMutate) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ImportPesertaCBTFormValue) => {
      const formData = new FormData();

      formData.append("file", data.filePeserta);
      const response = await service.sendPostRequest(
        "/account-distributions/bulk",
        formData
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
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useImportPesertaMutation;
