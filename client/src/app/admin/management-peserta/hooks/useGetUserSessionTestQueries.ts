import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IUserSessionTest = {
  info_peserta: {
    id: number;
    user_id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    code: string;
    nama_peserta: string;
    nomor_kontak: string;
  };
  session: {
    name: string;
    id: number;
  };
  id: number;
  score: number;
  score_summary: {
    correct_answer: number;
    wrong_answer: number;
    not_answer: number;
  };
};

type IUserSessionTestArgs = {
  limit: number;
  page: number;
  sessionId?: string | null;
  search?: string;
};

const useGetUserSessionTestQueries = (queries?: IUserSessionTestArgs) => {
  const service = new DirectusInterceptor();
  const { limit, page } = queries;
  return useQuery({
    queryKey: ["user-sessions-test", queries],
    queryFn: () => {
      const response = service.sendGetRequest<
        IBaseResponse<IUserSessionTest[]>
      >(`/videotron/get-session-results/` +queries?.sessionId, {
        fields: ["*.*"],
        limit,
        offset: (page - 1) * limit,
        meta: "*",
        });
      return response;
    },
  });
};
export default useGetUserSessionTestQueries;
