import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IUserTest = {
  answer: {
    is_correct: boolean;
  };
  problem: {
    question: string;
    kategori_id: {
      nama_kategori: string;
    };
    materi_id: {
      materi: string;
    };
  };
  user_session_id: {
    info_peserta: {
      nama_peserta: string;
    };
  };
};

type IUserTestArgs = {
  limit: number;
  page: number;
  pesertaId?: string;
  problemId?: string;
  user_session_id?: string;
};

const useGetUserTestQueries = (queries?: IUserTestArgs) => {
  const service = new DirectusInterceptor();
  const { limit, page, pesertaId, user_session_id ,problemId } = queries;

  return useQuery({
    queryKey: ["user-test", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IUserTest[]>>(
        `/items/user_test`,
        {
          fields: [
            "problem.*,answer.*,problem.kategori_id.*,user_session_id.info_peserta.*,problem.materi_id.*",
          ],
          filter: {
            user_session_id: { _eq: user_session_id },
            problem: {
              id: {
                _eq: problemId,
              },
            },
          },
          meta: "*",
          limit,
          offset: (page - 1) * limit,
        }
      );
      return response;
    },
  });
};
export default useGetUserTestQueries;
