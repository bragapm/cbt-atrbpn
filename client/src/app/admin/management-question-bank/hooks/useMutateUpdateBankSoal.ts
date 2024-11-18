import { FOLDER_KEY } from "@/services/constants/folder-key";
import { DirectusInterceptor } from "@/services/directus-interceptors";
import DirectusUpload from "@/services/directus-upload";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoalRequest, IBankSoal } from "@/types/collection/bank-soal.type";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IQuestionChoice } from "@/types/collection/question-choice.type";

type IUseMutateBankSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateBankSoal = ({ onSuccess, onError }: IUseMutateBankSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IBankSoalRequest) => {
      console.log({ data });
      let imageFileName: string | null = null;

      // Step 1: Optionally upload the main image for the question
      if (data.image) {
        const file = data.image as File;
        const fileResponse = await DirectusUpload({
          file,
          folderKey: FOLDER_KEY.question_image,
        });
        imageFileName = fileResponse.filename_disk;
      }

      const { choice, ...rest } = data;

      // Prepare question data, setting image only if uploaded
      const questionValue = {
        ...rest,
        image: imageFileName,
      };

      // Step 2: Put the question data to /items/questions_bank
      const response = await service.sendPatchRequest<
        IBankSoalRequest,
        IBaseResponse<IBankSoal> | undefined
      >(`/items/questions_bank/${questionValue.id}`, questionValue);

      // Step 3: Get all question choices
      const questionChoicesResponse = await service.sendGetRequest<
        IBaseResponse<IQuestionChoice[]>
      >(`/items/question_options?filter[question_id][_eq]=${questionValue.id}`);

      const existingChoices = questionChoicesResponse.data?.data;

      // Step 4: Upload images for each choice option if they exist
      const choiceValue = choice?.map(async (item, index) => {
        let uploadedOptionImageId = null;

        // Only upload if the option_image exists
        if (item.option_image) {
          const uploadedOption = await DirectusUpload({
            file: item.option_image as File,
            folderKey: FOLDER_KEY.question_option_image,
          });
          uploadedOptionImageId = uploadedOption.id; // Set the image ID if uploaded
        }

        return {
          ...item,
          order: item.order,
          question_id: questionValue.id,
          option_image: uploadedOptionImageId, // This will be null if not uploaded
          option_id: existingChoices?.[index]?.id, // Using the id from the response
        };
      });

      const resolvedChoices = await Promise.all(choiceValue);

      // Step 5: Update each choice option with the resolved image URL
      await Promise.all(
        resolvedChoices.map((choiceItem) =>
          service.sendPatchRequest(
            `/items/question_options/${choiceItem.option_id}`,
            choiceItem
          )
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
