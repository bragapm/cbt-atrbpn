import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import { IQuestionChoice } from "@/types/collection/question-choice.type";
import { useQuery } from "react-query";

const useGetBankSoalPreview = (id: string | undefined) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-bank-soal-preview", id],
    queryFn: async () => {
      if (!id) throw new Error("ID is required");

      const questionBankResponse = await service.sendGetRequest<
        IBaseResponse<IBankSoal>
      >(`/items/questions_bank/${id}`);

      const questionChoicesResponse = await service.sendGetRequest<
        IBaseResponse<IQuestionChoice[]>
      >(`/items/question_options?filter[question_id][_eq]=${id}`);

      return {
        questionBank: questionBankResponse.data,
        questionChoices: questionChoicesResponse.data,
      };
    },
    enabled: !!id, // Hanya fetch jika id tersedia
  });
};

export default useGetBankSoalPreview;
