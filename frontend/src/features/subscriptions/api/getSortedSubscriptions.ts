import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/apiClient";
import type { SortBy, SortOrder, Subscription } from "../../../types/api";

export const useGetSortedSubscriptions = (
  sortBy: SortBy,
  sortOrder: SortOrder,
) => {
  return useQuery({
    queryKey: ["subscriptions", "sorted", sortBy, sortOrder],
    queryFn: () => getSortedSubscriptions({ sortBy, sortOrder }),
  });
};

type SortParams = {
  sortBy: SortBy;
  sortOrder: SortOrder;
};

export const getSortedSubscriptions = async ({
  sortBy,
  sortOrder,
}: SortParams): Promise<Subscription[]> => {
  const response = await api.get("/subscriptions/sorted", {
    params: {
      sortBy,
      sortOrder,
    },
  });

  return response.data.data.subscriptions;
};
