import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IDistribusiSoal = {
  materi_id: {
    materi: string;
    id: number;
  };
  kategori_id: {
    nama_kategori: string;
    bobot_benar: number;
    bobot_salah: number;
    tidak_menjawab: number;
    id: string;
  };
  id: number;
  jumlah_soal: number;
};

const useGetManagementDistribusiSoalDetailQuery = (id: string) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["distribusi-soal", id],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IDistribusiSoal>>(
        `/items/distribusi_soal/${id}`,
        {
          fields: "*.*",
        }
      );
      return response;
    },
  });
};
export default useGetManagementDistribusiSoalDetailQuery;
