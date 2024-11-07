import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { IKategori } from "@/types/collection/kategori.type";
import { IMateri } from "@/types/collection/materi.type";
import { IDirectusQueryParams } from "@/types/directus.type";
import { useQuery } from "react-query";

export type IDistribusiSoal = {
  id: number;
  user_created: string;
  user_updated: string;
  date_created: string;
  date_updated: string;
  kategori_id: IKategori;
  materi_id: IMateri;
  jumlah_soal: number;
};

const useGetManagementDistribusiSoal = ({
  page,
  limit,
}: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["pendistribusi-soal"],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IDistribusiSoal[]>>(
        "/items/distribusi_soal",
        { fields: ["*.*"], meta: "*", page, limit }
      );
      return response;
    },
  });
};
export default useGetManagementDistribusiSoal;
