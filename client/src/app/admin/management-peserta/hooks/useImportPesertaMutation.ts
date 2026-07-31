import { DirectusInterceptor } from "@/services/directus-interceptors";
import { getApiErrorMessage } from "@/lib/api-error";
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
    onError: (error: unknown) => {
      onError?.(getApiErrorMessage(error));
    },
  });
};

export default useImportPesertaMutation;
