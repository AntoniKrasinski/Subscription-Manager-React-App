import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import { api } from "../../../lib/apiClient";
import toast from "react-hot-toast";

export const useEditPreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.preferences,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptionsStats,
      });

      toast.success("Settings successfully changed.");
    },
  });
};

const editPreferences = async (data: {
  currency: "pln" | "usd";
}): Promise<void> => {
  await api.patch("/preferences", data);
};
