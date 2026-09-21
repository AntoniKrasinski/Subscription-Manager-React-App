import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import type { Subscription } from "../../../types/api";

export const useGetAllSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllSubscribers,
  });
};

const getAllSubscribers = async (): Promise<Subscription[]> => {
  const response = await api.get("/subscriptions");
  return response.data.data.userSubscriptions;
};
