import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IKategori } from "@/types/collection/kategori.type";
import { useQuery } from "react-query";

const useGetKategoriSoal = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["kategori-soal"],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IKategori[]>>(
        "/items/kategori_soal",
        { fields: ["*.*"], meta: "*" },
      );
      return response?.data;
    },
  });
};

export default useGetKategoriSoal;
