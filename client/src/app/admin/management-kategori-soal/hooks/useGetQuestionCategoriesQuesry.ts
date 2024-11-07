import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IQuestionCategory } from "./useGetQuestionCategoryQuery";

const useGetQuestionCategories = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["kategori-soal"],
    queryFn: () => {
      const response = service.sendGetRequest<
        IBaseResponse<IQuestionCategory[]>
      >(`/items/kategori_soal`, {
        fields: ["*.*"],
      });
      return response;
    },
  });
};
export default useGetQuestionCategories;
