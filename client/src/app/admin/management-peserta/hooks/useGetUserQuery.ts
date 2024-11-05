import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseResponse } from "@/types/base-response";
import { useQuery } from "react-query";

export type IUser = {
  code: string;
  user_id: {
    id: string;
  };
  id: number;
};

type IUserArgs = {
  code: string;
};

const useGetUserQuery = (queries?: IUserArgs) => {
  const service = new DirectusInterceptor();
  const { code } = queries;

  return useQuery({
    queryKey: ["coupon", queries],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<IUser[]>>(
        `/items/coupon`,
        {
          fields: ["*.*"],
          filter: {
            code: { _eq: code },
          },
          meta: "*",
        }
      );
      return response;
    },
    enabled: !!code,
  });
};
export default useGetUserQuery;
