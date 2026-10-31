import React from "react";
import { useDeleteSubscription } from "../api/deleteSubscription";
import EditSubscriptionButton from "./EditSubscriptionButton";
import { getDaysUntil } from "../../../utils/getDaysUntl";
import ShowLogo from "./ShowLogo";
import { ChevronsUpDown } from "lucide-react";
import type { SortBy, SortOrder } from "../../../types/api";
import { useGetSortedSubscriptions } from "../api/getSortedSubscriptions";

const SubscriptionsList = () => {
  const deleteMutation = useDeleteSubscription();

  const columns = [
    { label: "Name", value: "name" },
    { label: "Category", value: null },
    { label: "Price", value: "price" },
    { label: "Billing cycle", value: "billingCycle" },
    { label: "Next payment", value: "nextPayment" },
  ] as const;

  const [sortBy, setSortBy] = React.useState<SortBy>("name");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");

  const {
    data: userSubscriptions,
    isLoading,
    isError,
  } = useGetSortedSubscriptions(sortBy, sortOrder);

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !userSubscriptions) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="flex  flex-col justify-center p-8  bg-surface border border-border rounded-xl">
        {userSubscriptions.length === 0 ? (
          "add first subscription"
        ) : (
          <table className="w-full border-separate border-spacing-y-6">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.label} className="px-3 pb-3 text-left">
                    {column.value ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column.value)}
                        className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0"
                      >
                        {column.label}

                        <ChevronsUpDown
                          size={sortBy === column.value ? 16 : 14}
                          className={
                            sortBy === column.value
                              ? "text-primary"
                              : "text-black"
                          }
                        />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}

                <th className="px-3 pb-3 text-left">Status</th>
                <th className="px-3 pb-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userSubscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td className="px-3">
                    <div className="flex items-center w-full ">
                      <ShowLogo
                        name={subscription.title}
                        showImage={subscription.showImage}
                      />
                      <span className="data relative left-8">
                        {subscription.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-primary-soft text-primary-strong rounded-xl py-1 px-2 ">
                      {subscription.category}
                    </span>
                  </td>
                  <td className="data p-3">
                    {subscription.price} {subscription.currency}
                  </td>
                  <td className="px-3">{subscription.billingCycle}</td>
                  <td className="px-3">
                    <span className="text-text-muted">
                      {getDaysUntil(subscription.nextBillingDate)}
                    </span>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-success-soft text-success rounded-xl py-1 px-2">
                      Active
                    </span>
                  </td>
                  <td className="px-3">
                    <div className="flex items-center justify-end gap-2">
                      <EditSubscriptionButton subscription={subscription} />
                      <button
                        type="button"
                        onClick={() =>
                          deleteMutation.mutate(subscription.id as string)
                        }
                        className="min-h-9 cursor-pointer rounded-xl border-0 bg-danger-soft px-4 py-2 text-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SubscriptionsList;
