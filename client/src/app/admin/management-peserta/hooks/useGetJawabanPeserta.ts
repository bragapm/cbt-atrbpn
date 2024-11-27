import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IJawabPeserta = {
    id:number,
    soal_pertanyaan:string,
    jawaban:number,
    kategori:string,
    skor:string,
    nilai_jawaban_benar:string,
    materi:string
};

type IUserTestArgs = {
  user_session_id?: string;
};

const useGetJawabanPeserta = (queries?: IUserTestArgs) => {
  const service = new DirectusInterceptor();
  const {  user_session_id } = queries;

  return useQuery({
    queryKey: ["jawaban-peserta", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IJawabPeserta[]>>(
        `/jawaban-peserta?user_session_id=`+ user_session_id
      );
      return response;
    },
  });
};
export default useGetJawabanPeserta;
