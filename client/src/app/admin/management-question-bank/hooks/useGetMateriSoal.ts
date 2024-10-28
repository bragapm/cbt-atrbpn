import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IMateri } from "@/types/collection/materi.type";
import { useQuery } from "react-query";

const useGetMateriSoal = () => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["materi-soal"],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IMateri[]>>(
        "/items/materi_soal",
        { fields: ["*.*"], meta: "*" },
      );
      return response?.data;
    },
  });
};

export default useGetMateriSoal;
