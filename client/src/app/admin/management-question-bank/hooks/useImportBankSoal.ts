import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { IBaseResponse } from "@/types/base-response";
import { IBaseErrorResponse } from "@/types/errors";

type IUseImportBankSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type IBankSoalImport = {
  file: File;
};

const useImportBankSoal = ({ onSuccess, onError }: IUseImportBankSoal) => {
  const service = new DirectusInterceptor();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return await service.sendPostRequest<
        FormData,
        IBaseResponse<IBankSoalImport>
      >("/import-questions/", formData);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ?? "Gagal import File!";

      onError?.(errorMessage);
    },
  });
};

export default useImportBankSoal;
