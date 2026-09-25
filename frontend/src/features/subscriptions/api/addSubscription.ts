import { api } from "../../../lib/apiClient";
import type { Subscription } from "../../../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSubscription = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      onSuccess?.();
    },
  });
};

const addSubscription = async (data: Subscription): Promise<void> => {
  await api.post("/subscriptions", data);
};
