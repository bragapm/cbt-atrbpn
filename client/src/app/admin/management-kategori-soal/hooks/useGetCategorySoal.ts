import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
import { IKategori } from "@/types/collection/kategori.type";
import { IDirectusQueryParams } from "@/types/directus.type";

const useGetQuestionCategorySoal = ({ page, limit }: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["category-soal"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IKategori[]>>(
        `/items/kategori_soal`,
        {
          fields: ["*.*"],
          meta: "*",
          page,
          limit,
        }
      );
      return response;
    },
  });
};
export default useGetQuestionCategorySoal;
