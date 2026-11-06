import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/TanStackConfig/queryKeys";
import type { SubscriptionsStats, SubscriptionsCategoriesStats } from "../../../types/api";

export const useGetSubscriptionsStats = () => {
  return useQuery({
    queryKey: queryKeys.subscriptionsStats,
    queryFn: getSubscriptionStats,
  });
};

export const useGetSubscriptionsCategoriesStats = () => {
  return useQuery({
    queryKey: queryKeys.subscriptionsCategoriesStats,
    queryFn: getSubscriptionCategoriesStats,
  });
};

const getSubscriptionStats = async (): Promise<SubscriptionsStats> => {
  const response = await api.get("/stats/subscriptions");
  return response.data.data;
};

const getSubscriptionCategoriesStats = async (): Promise<SubscriptionsCategoriesStats> => {
  const response = await api.get("/stats/categories");
  return response.data.data;
};
