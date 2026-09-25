import { api } from "../../../lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions }),
  });
};

const deleteSubscription = async (
  subscriptionId: string,
): Promise<void> => {
  return await api.delete(`/subscriptions/${subscriptionId}`);
};
