import { api } from "../../../lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subscriptions", ] }),
  });
};

const deleteSubscription = async (
  subscriptionId: string,
): Promise<void> => {
  return await api.delete(`/subscriptions/${subscriptionId}`);
};
