import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IQuestion = {
  id: number;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  category: string | null;
  random_options: boolean;
  is_required: boolean;
  difficulty: string | null;
  question_text: string;
  question: string | null;
  random_question: string | null;
  materi: string | null;
};

const useGetManagementBankSoal = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-bank-soal"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IQuestion[]>>(
        "/items/questions_bank",
      );

      return response;
    },
  });
};

export default useGetManagementBankSoal;
