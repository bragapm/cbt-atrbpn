import { DirectusInterceptor } from "@/services/directus-interceptors";
import { useQuery } from "react-query";
import { IKategori } from "@/types/collection/kategori.type";
import { IDirectusQueryParams } from "@/types/directus.type";

 type IBaseResponse<T> = {
  data: T;
  pagination: IBaseMetaResponse;
};

 type IBaseMetaResponse = {
  total: number;
};


const useGetDataListAdmin = ({
  page,
  limit,
  search,
}: IDirectusQueryParams) => {
  const service = new DirectusInterceptor();
  return useQuery({
    queryKey: ["list-admin", page, limit, search],
    queryFn: () => {
      const response = service.sendGetRequest<IBaseResponse<any[]>>(
        `/register-user/list-users`,
        {
          fields: ["*.*"],
          meta: "*",
          page,
          limit,
          search: search,
        }
      );
      return response;
    },
  });
};
export default useGetDataListAdmin;
