import React from "react";
import { useGetAllSubscriptions } from "../api/getSubscriptions";
import { useDeleteSubscription } from "../api/deleteSubscription";
import EditSubscriptionButton from "./EditSubscriptionButton";
import { getDaysUntil } from "../../../utils/getDaysUntl";
const SubscriptionsList = () => {
  const {
    data: userSubscriptions,
    isLoading,
    isError,
  } = useGetAllSubscriptions();

  const deleteMutation = useDeleteSubscription();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !userSubscriptions) {
    return <div>error</div>;
  }
  console.log(typeof userSubscriptions[0].nextBillingDate);
  return (
    <>
      <div className="flex  flex-col justify-center text-left p-8 h-full bg-card-bg border">
        {userSubscriptions.length === 0 ? (
          "add first subscription"
        ) : (
          <table className="w-full  ">
            <thead>
              <tr>
                <th>
                  <button>
                    Nazwa <span className="sort-icon">&#9650;</span>
                  </button>
                </th>
                <th>
                  <button>
                    Kategoria <span className="sort-icon">&#9650;</span>
                  </button>
                </th>
                <th>
                  <button>
                    Cena <span className="sort-icon">&#9650;</span>
                  </button>
                </th>
                <th>
                  <button>
                    Billing cycle <span className="sort-icon">&#9650;</span>
                  </button>
                </th>

                <th>
                  <button>
                    Następna płatność <span className="sort-icon">&#9650;</span>
                  </button>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userSubscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>{subscription.title}</td>
                  <td>{subscription.category}</td>
                  <td className="price" data-value="43">
                    {subscription.price} {subscription.currency}
                  </td>
                  <td>{subscription.billingCycle}</td>
                  <td>
                    {subscription.nextBillingDate
                      ? getDaysUntil(subscription.nextBillingDate)
                      : getDaysUntil(subscription.freeTrialEnd as string)}
                  </td>
                  <td>
                    <span className="badge active">{"Active"}</span>
                  </td>
                  <td>
                    {" "}
                    <EditSubscriptionButton subscriptionId={subscription.id!} />
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() =>
                        deleteMutation.mutate(subscription.id as string)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="">
          <button>Import</button>
          <button>Export</button>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsList;
