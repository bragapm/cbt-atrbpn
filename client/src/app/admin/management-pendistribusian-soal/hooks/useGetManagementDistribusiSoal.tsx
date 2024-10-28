import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";
export type IDistribusiSoal = {
  id: number;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  kategori_id: IKategoriSoal[];
  materi_id: IMateriSoal[];
  jumlah_soal: number;
};

type IKategoriSoal = {
  id: number;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  bobot_benar: number;
  bobot_salah: number;
  tidak_menjawab: number;
};

type IMateriSoal = {
  id: number;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  materi: string;
};
const useGetManagementDistribusiSoal = () => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["pendistribusi-soal"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IDistribusiSoal[]>>(
        "/items/distribusi_soal"
      );
      return response;
    },
  });
};
export default useGetManagementDistribusiSoal;
