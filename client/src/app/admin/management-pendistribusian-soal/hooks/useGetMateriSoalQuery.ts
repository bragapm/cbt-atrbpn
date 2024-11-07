import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IMateriSoal = {
  materi: string;
  id: number;
};

const useGetMateriSoalQuery = (id: string | undefined) => {
  const service = new DirectusInterceptor();

  return useQuery({
    queryKey: ["materi-soal", id],
    queryFn: async () => {
      const response = await service.sendGetRequest<IBaseResponse<IMateriSoal>>(
        `/items/materi_soal/${id}`,
        {
          fields: "*.*",
        }
      );
      return response;
    },
    enabled: Boolean(id),
  });
};

export default useGetMateriSoalQuery;
