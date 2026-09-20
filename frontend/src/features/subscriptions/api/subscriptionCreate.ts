import { api } from "../../../lib/apiClient";
import type { Subscription } from "../../../types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubscription,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] }),
  });
};

const addSubscription = async (data: Subscription): Promise<void> => {
  const response = await api.post("/subscriptions", data);
  return response.data;
};
