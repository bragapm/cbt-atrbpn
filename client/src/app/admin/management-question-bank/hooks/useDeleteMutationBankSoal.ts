import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IBaseResponse } from "@/types/base-response";
import { IQuestionChoice } from "@/types/collection/question-choice.type";

type IUseMutateBankSoal = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useDeleteMutationBankSoal = ({
  onSuccess,
  onError,
}: IUseMutateBankSoal) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string | number }) => {
      const choices = await service.sendGetRequest<
        IBaseResponse<IQuestionChoice[]>
      >(`/items/question_options?filter[question_id][_eq]=${data.id}`);

      if (Array.isArray(choices.data) && choices.data.length > 0) {
        await Promise.all(
          (choices.data as IQuestionChoice[]).map(async (choice) => {
            await service.sendDeleteRequest(
              `/items/question_options/${choice.id}`
            );
          })
        );
      }

      const response = await service.sendDeleteRequest(
        `/items/questions_bank/${data.id}`
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

export default useDeleteMutationBankSoal;
