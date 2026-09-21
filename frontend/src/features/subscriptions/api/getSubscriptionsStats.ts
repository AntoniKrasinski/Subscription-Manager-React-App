import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";

export const useGetSubscriptionsStats = () => {
  return useQuery({
    queryKey: ["subscriptions", "stats"],
    queryFn: getSubscriptionStats,
  });
};

const getSubscriptionStats = async (): Promise<any> => {
  const response = await api.get("/subscriptions/stats");
  console.log(response);
  return response.data.data;
};
