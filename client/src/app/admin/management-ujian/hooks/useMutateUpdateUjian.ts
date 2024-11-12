import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  IUjian,
  IUjianRequest,
  IUserSessionTest,
  IUserSessionTestRequest,
} from "@/types/collection/ujian.type";
import { IBaseResponse } from "@/types/base-response";

type IUseMutateUjian = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useMutateUpdateUjian = ({ onSuccess, onError }: IUseMutateUjian) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IUjianRequest) => {
      // Update the main session
      const response = await service.sendPatchRequest<
        IUjianRequest,
        IBaseResponse<IUjian>
      >(`/items/session_test/${data.id}`, data);

      if (data.user) {
        // Fetch existing user_session_test entries for the session
        const userSessionResponse = await service.sendGetRequest<
          IBaseResponse<IUserSessionTest>
        >(`/items/user_session_test?filter[session][_eq]=${data.id}`);

        const existingUserSessions = userSessionResponse.data.data;

        // Prepare update requests for each user
        const updateRequests = data.user.map((userId, index) => {
          const userSessionId = existingUserSessions[index]?.id;

          const modifiedData: IUserSessionTestRequest = {
            user: userId,
            session: data.id,
          };

          // If a user session exists, update it; otherwise, create a new entry
          if (userSessionId) {
            return service.sendPatchRequest<
              IUserSessionTestRequest,
              IBaseResponse<IUserSessionTest>
            >(`/items/user_session_test/${userSessionId}`, modifiedData);
          } else {
            return service.sendPostRequest<
              IUserSessionTestRequest,
              IBaseResponse<IUserSessionTest>
            >("/items/user_session_test", modifiedData);
          }
        });

        // Execute all update requests concurrently
        await Promise.all(updateRequests);
      }

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
        error.response?.data?.errors?.[0]?.message ?? "Coba Sesaat Lagi";

      onError?.(errorMessage);
    },
  });
};

export default useMutateUpdateUjian;
