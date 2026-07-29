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
      // Step 1: Optionally upload the main image for the question
      let imageFileName: string | null = null;

      if (data.image instanceof File) {
        const fileResponse = await DirectusUpload({
          file: data.image,
          folderKey: FOLDER_KEY.question_image,
        });
        imageFileName = fileResponse.filename_disk;
      }

      const { choice, random_question, random_options, ...rest } = data;

      // Prepare question data, setting image only if uploaded.
      // "Soal Acak" is stored in `is_required`: a question that is required is
      // always included by the distribution logic, so acak means NOT required.
      // `random_question` is kept in sync because the export report reads it.
      const questionValue = {
        ...rest,
        image: imageFileName,
        random_question,
        is_required: random_question === "false",
        random_options: random_options === "true",
      };

      // Step 2: Post the question data to /items/questions_bank
      const response = await service.sendPostRequest<
        typeof questionValue,
        IBaseResponse<IBankSoal>
      >("/items/questions_bank", questionValue);

      const questionId = response.data.data.id;

      // Step 3: Upload images for each choice option and prepare data for options
      const choiceValue = choice?.map(async (item, index) => {
        let optionImageId: string | null = null;

        if (item.option_image instanceof File) {
          const uploadedOption = await DirectusUpload({
            file: item.option_image,
            folderKey: FOLDER_KEY.question_option_image,
          });
          optionImageId = uploadedOption.id;
        } else if (typeof item.option_image === "string" && item.option_image) {
          // Already an existing Directus file id, reuse it as is
          optionImageId = item.option_image;
        }

        return {
          ...item,
          order: index + 1,
          question_id: questionId,
          option_image: optionImageId,
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
