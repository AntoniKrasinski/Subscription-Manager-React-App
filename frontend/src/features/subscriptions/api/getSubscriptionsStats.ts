import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";

export const useGetSubscriptionsStats = () => {
  return useQuery({
    queryKey: queryKeys.subscriptionsStats,
    queryFn: getSubscriptionStats,
  });
};

const getSubscriptionStats = async (): Promise<any> => {
  const response = await api.get("/subscriptions/stats");
  console.log(response);
  return response.data.data;
};
