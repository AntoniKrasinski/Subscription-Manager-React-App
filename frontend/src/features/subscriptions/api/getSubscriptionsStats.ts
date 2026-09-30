import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import type { SubscriptionsStats } from "../../../types/api";

export const useGetSubscriptionsStats = () => {
  return useQuery({
    queryKey: queryKeys.subscriptionsStats,
    queryFn: getSubscriptionStats,
  });
};

const getSubscriptionStats = async (): Promise<SubscriptionsStats> => {
  const response = await api.get("/stats/subscriptions");
  console.log(response);
  return response.data.data;
};
