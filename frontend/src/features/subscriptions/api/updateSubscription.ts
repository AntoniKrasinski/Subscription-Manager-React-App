import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import type { UpdateSubscription } from "../../../types/api";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions });
    },
  });
};

const updateSubscription = async ({
  subscriptionId,
  data,
}: {
  subscriptionId: string;
  data: UpdateSubscription;
}): Promise<void> => {
  await api.patch(`/subscriptions/${subscriptionId}`, data);
};
