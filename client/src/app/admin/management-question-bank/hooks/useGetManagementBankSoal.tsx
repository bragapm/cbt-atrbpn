import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import { IDirectusQueryParams } from "@/types/directus.type";
import { useQuery } from "react-query";

const useGetManagementBankSoal = ({
  page,
  limit,
  search,
  category,
  materi,
}: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-bank-soal", page, limit, search, category, materi],
    queryFn: async () => {
      const filters = {
        _and: [
          ...(category ? [{ kategori_id: { _eq: category } }] : []),
          ...(materi ? [{ materi_id: { _eq: materi } }] : []),
        ],
      };

      const response = await service.sendGetRequest<IBaseResponse<IBankSoal[]>>(
        "/items/questions_bank",
        {
          fields: ["*.*"],
          meta: "*",
          page,
          limit,
          filter: filters,
        }
      );

      return response?.data;
    },
  });
};

export default useGetManagementBankSoal;
