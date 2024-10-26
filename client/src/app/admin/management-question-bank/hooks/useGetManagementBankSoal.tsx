import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IBankSoal } from "@/types/collection/bank-soal.type";
import { useQuery } from "react-query";

const useGetManagementBankSoal = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["management-bank-soal"],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IBankSoal[]>>(
        "/items/questions_bank",
        { fields: ["*.*"] },
      );
      return response?.data;
    },
  });
};

export default useGetManagementBankSoal;
