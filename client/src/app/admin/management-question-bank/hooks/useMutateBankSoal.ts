import { FOLDER_KEY } from "@/services/constants/folder-key";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import DirectusUpload from "@/services/directus-upload";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoalRequest, IBankSoal } from "@/types/collection/bank-soal.type";
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

      const { choice, ...rest } = data;

      const questionValue = {
        ...rest,
        image: fileResponse.filename_disk,
      };

      const response = await service.sendPostRequest<
        IBankSoalRequest,
        IBaseResponse<IBankSoal>
      >("/items/questions_bank", questionValue);

      const choiceValue = choice?.map((item) => {
        return {
          ...item,
          question_id: response.data.data.id,
        };
      });

      if (choiceValue && choiceValue.length > 0) {
        await Promise.all(
          choiceValue.map((choiceItem) =>
            service.sendPostRequest("/items/question_options", choiceItem)
          )
        );
      }

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
