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
      // Extract the session ID from the response
      const sessionId = response.data.data.id;
      if (!data.user) {
        return response;
      }
      // Prepare requests for each user in `data.user`
      const userRequests = data.user.map((userId) => {
        const modifiedData = {
          session: sessionId,
        };
        return service.sendPatchRequest<
          IUserSessionTestRequest,
          IBaseResponse<IUserSessionTest>
        >(`/items/user_session_test/${userId}`, modifiedData);
      });
      // Execute all user requests concurrently
      await Promise.all(userRequests);
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
