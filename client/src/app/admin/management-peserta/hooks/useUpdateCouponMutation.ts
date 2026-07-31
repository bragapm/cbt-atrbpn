import { DirectusInterceptor } from "@/services/directus-interceptors";
import { getApiErrorMessage } from "@/lib/api-error";
import { useMutation, useQueryClient } from "react-query";
import { UpdateCoupon } from "../types";

type IUseUpdateCouponMutate = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const useUpdateCouponMutation = (
  id: number | undefined,
  { onSuccess, onError }: IUseUpdateCouponMutate
) => {
  const service = new DirectusInterceptor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<UpdateCoupon>) => {
      const response = await service.sendPatchRequest(`/items/coupon/${id}`, {
        ...data,
        updateAt: new Date(),
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-sessions-test"],
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      onError?.(getApiErrorMessage(error));
    },
  });
};

export default useUpdateCouponMutation;
