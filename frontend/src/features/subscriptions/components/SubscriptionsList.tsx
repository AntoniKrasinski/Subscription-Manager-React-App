import React from "react";
import { useDeleteSubscription } from "../api/deleteSubscription";
import EditSubscriptionButton from "./EditSubscriptionButton";
import { getDaysUntil } from "../../../utils/getDaysUntl";
import ShowLogo from "./ShowLogo";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { SortBy, SortOrder } from "../../../types/api";
import { useGetSortedSubscriptions } from "../api/getSortedSubscriptions";
import { useConfirmModal } from "../../../hooks/useConfirmModal";

const SubscriptionsList = () => {
  const { confirmModal } = useConfirmModal();
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

  const handleDelete = (id: string, title: string) => {
    confirmModal(
      () => deleteMutation.mutate(id),
      `Are you sure to delete subscription "${title}"?`,
    );
  };

  const sortOptions: { label: string; value: SortBy }[] = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Billing cycle", value: "billingCycle" },
    { label: "Next payment", value: "nextPayment" },
  ];

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !userSubscriptions) {
    return <div>error</div>;
  }

  return (
    <>
      <div className="flex min-h-0 flex-col justify-center rounded-xl border border-border bg-surface p-3 sm:p-5 lg:p-8">
        {userSubscriptions.length === 0 ? (
          "add first subscription"
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
              <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-text-muted">
                Sort by
                <select
                  className="min-w-0 flex-1"
                  value={sortBy}
                  onChange={(event) => {
                    const option = sortOptions.find(
                      ({ value }) => value === event.target.value,
                    );
                    if (option) {
                      setSortBy(option.value);
                      setSortOrder("asc");
                    }
                  }}
                >
                  {sortOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
                className="flex h-10 shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm text-text-muted"
              >
                {sortOrder === "asc" ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
                {sortOrder === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto md:hidden">
              {userSubscriptions.map((subscription) => (
                <article
                  key={subscription.id}
                  className="min-w-0 rounded-xl border border-border bg-bg p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
                      <ShowLogo
                        name={subscription.title}
                        showImage={subscription.showImage}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-0 truncate text-base">
                        {subscription.title}
                      </h2>
                      <p className="break-words font-semibold">
                        {subscription.price} {subscription.currency}
                        <span className="ml-1 font-normal text-text-muted">
                          / {subscription.billingCycle}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <span className="rounded-xl bg-primary-soft px-2 py-1 text-xs text-primary-strong">
                      {subscription.category}
                    </span>
                    <span className="text-sm text-text-muted">
                      {getDaysUntil(subscription.nextBillingDate)}
                    </span>
                    <span className="rounded-xl bg-success-soft px-2 py-1 text-xs text-success">
                      Active
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2 border-t border-border pt-3">
                    <EditSubscriptionButton subscription={subscription} />
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(subscription.id, subscription.title)
                      }
                      className="min-h-10 flex-1 cursor-pointer rounded-xl border-0 bg-danger-soft px-3 py-2 text-sm text-danger"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden min-h-0 flex-1 overflow-auto md:block">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-4 sm:border-spacing-y-6">
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
                            handleDelete(subscription.id, subscription.title)
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SubscriptionsList;
