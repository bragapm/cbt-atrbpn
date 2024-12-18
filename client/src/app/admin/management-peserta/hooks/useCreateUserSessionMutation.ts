import { DirectusInterceptor } from "@/services/directus-interceptors";
import { IBaseErrorResponse } from "@/types/errors";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CreateUserSessionTest } from "../types";

type IUseMutateUserSession = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useCreateUserSessionMutation = ({
  onSuccess,
  onError,
}: IUseMutateUserSession) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserSessionTest) => {
      const response = await service.sendPostRequest(
        "/items/user_session_test",
        {
          ...data,
          created_at: new Date(),
          updated_at: new Date(),
          status: "published",
        }
      );

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-sessions-test"],
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

export default useCreateUserSessionMutation;
