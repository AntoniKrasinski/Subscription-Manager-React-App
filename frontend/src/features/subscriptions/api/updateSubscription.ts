import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import type { UpdateSubscriptionData } from "../../../types/api";

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

const updateSubscription = async ({
  subscriptionId,
  data,
}: {
  subscriptionId: string;
  data: UpdateSubscriptionData;
}): Promise<void> => {
  await api.patch(`/subscriptions/${subscriptionId}`, data);
};
