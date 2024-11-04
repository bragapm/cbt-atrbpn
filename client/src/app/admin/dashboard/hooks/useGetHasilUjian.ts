import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

type IQuestionCategory = {
  nama_kategori: string;
  bobot_benar: number;
  bobot_salah: number;
  tidak_menjawab: number;
  id: number;
};

const useGetHasilUjian = (id: string) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["hasi-ujian-average", id],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IQuestionCategory>>(
        `/items/kategori_soal/${id}`,
        {
          fields: "*.*",
        }
      );
      return response;
    },
  });
};
export default useGetHasilUjian;
