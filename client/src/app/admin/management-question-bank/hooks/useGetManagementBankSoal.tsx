import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import { IDirectusQueryParams } from "@/types/directus.type";
import { useQuery } from "react-query";

const useGetManagementBankSoal = ({ page, limit }: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-bank-soal", page, limit],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IBankSoal[]>>(
        "/items/questions_bank",
        { fields: ["*.*"], meta: "*", page, limit },
      );
      return response?.data;
    },
  });
};

export default useGetManagementBankSoal;
