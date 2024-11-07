import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IUjianRequest } from "@/types/collection/ujian.type";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IBaseResponse } from "@/types/base-response";
import {
  IUjian,
  IUserSessionTest,
  IUserSessionTestRequest,
} from "@/types/collection/ujian.type";

type IUseMutateUjian = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateUjian = ({ onSuccess, onError }: IUseMutateUjian) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUjianRequest) => {
      const response = await service.sendPostRequest<
        IUjianRequest,
        IBaseResponse<IUjian>
      >("/items/session_test", data);

      // Modify the data for the next request
      const modifiedData = {
        user: data.user[0], //Get User index 0
        session: response.data.data.id,
      };

      // Send the modified data to "/items/user_session_test"
      await service.sendPostRequest<
        IUserSessionTestRequest,
        IBaseResponse<IUserSessionTest>
      >("/items/user_session_test", modifiedData);

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["management-ujian"],
      });
      onSuccess?.();
    },
    onError: (error: AxiosError<IBaseErrorResponse>) => {
      const errorMessage =
        error.response.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutateUjian;
