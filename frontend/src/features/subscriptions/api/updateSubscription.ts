import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import type { UpdateSubscription } from "../../../types/api";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import toast from "react-hot-toast";

export const useUpdateSubscription = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions });
      toast.success("Subscription successfullu updated");
      onSuccess?.();
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
