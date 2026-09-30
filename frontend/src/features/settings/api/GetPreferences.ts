import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import { api } from "../../../lib/apiClient";

export const usePreferences = () => {
  return useQuery({
    queryFn: getPreferences,
    queryKey: queryKeys.preferences,
  });
};

const getPreferences = async () => {
  const response = await api.get("/preferences");
  return response.data.data;
};
