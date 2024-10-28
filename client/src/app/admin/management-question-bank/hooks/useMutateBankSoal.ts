import { FOLDER_KEY } from "@/services/constants/folder-key";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import DirectusUpload from "@/services/directus-upload";
import { IBankSoalRequest } from "@/types/collection/bank-soal.type";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

type IUseMutateBankSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateBankSoal = ({ onSuccess, onError }: IUseMutateBankSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IBankSoalRequest) => {
      const file = data.image as File;
      const fileResponse = await DirectusUpload({
        file,
        folderKey: FOLDER_KEY.question_image,
      });

      const insertImage = {
        ...data,
        image: fileResponse.filename_disk,
      };

      const response = await service.sendPostRequest(
        "/items/questions_bank",
        insertImage,
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

export default useMutateBankSoal;
