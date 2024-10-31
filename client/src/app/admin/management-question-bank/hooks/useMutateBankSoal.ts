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
      // Step 1: Upload the main image for the question
      const file = data.image as File;
      const fileResponse = await DirectusUpload({
        file,
        folderKey: FOLDER_KEY.question_image,
      });

      const { choice, ...rest } = data;

      // Prepare question data with the uploaded image URL
      const questionValue = {
        ...rest,
        image: fileResponse.filename_disk,
      };

      // Step 2: Post the question data to /items/questions_bank
      const response = await service.sendPostRequest<
        IBankSoalRequest,
        IBaseResponse<IBankSoal>
      >("/items/questions_bank", questionValue);

      const questionId = response.data.data.id;

      // Step 3: Upload images for each choice option and prepare data for options
      const choiceValue = choice?.map(async (item) => {
        const uploadedOption = item.option_image
          ? await DirectusUpload({
              file: item.option_image as File,
              folderKey: FOLDER_KEY.question_option_image,
            })
          : null;

        return {
          ...item,
          question_id: questionId,
          option_image: uploadedOption ? uploadedOption.id : null,
        };
      });

      const resolvedChoices = await Promise.all(choiceValue);

      // Step 4: Post each choice option with the resolved image URL
      await Promise.all(
        resolvedChoices.map((choiceItem) =>
          service.sendPostRequest("/items/question_options", choiceItem)
        )
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
        error.response?.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutateBankSoal;
