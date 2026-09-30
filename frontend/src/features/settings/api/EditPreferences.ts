import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import { api } from "../../../lib/apiClient";

export const useEditPreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPreferences,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.preferences,
      }),
  });
};

const editPreferences = async (data: {
  currency: "pln" | "usd";
}): Promise<void> => {
  await api.patch("/preferences", data);
};
