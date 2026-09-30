import { api } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import type { CreateSubscription } from "../../../types/api";
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
      queryClient.invalidateQueries({ queryKey: queryKeys.subscriptions });
      onSuccess?.();
    },
  });
};

const addSubscription = async (data: CreateSubscription): Promise<void> => {
  await api.post("/subscriptions", data);
};
