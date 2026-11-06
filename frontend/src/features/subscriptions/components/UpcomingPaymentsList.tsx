import Error from "../../../components/UI/Error";
import { useGetSortedSubscriptions } from "../api/getSortedSubscriptions";
import { getDaysUntil } from "../../../utils/getDaysUntl";
import ShowLogo from "./ShowLogo";

const UpcomingPaymentsList = () => {
  const {
    data: subscriptions,
    isLoading,
    isError,
  } = useGetSortedSubscriptions("nextPayment", "asc");

  if (isLoading) return <div>Loading...</div>;
  if (isError || !subscriptions) return <Error />;
  return (
    <div className="flex flex-col justify-center p-8 bg-surface border border-border rounded-xl">
      {subscriptions.length === 0 ? (
        "No upcoming payments"
      ) : (
        <div className="overflow-y-auto min-h-0 max-h-[clamp(200px,40vh,600px)]">
          <table className="w-full border-separate border-spacing-y-6 ">
            <thead>
              <tr>
                <th className="px-3 pb-3 text-left">Name</th>
                <th className="px-3 pb-3 text-left">Price</th>
                <th className="px-3 pb-3 text-left">Next payment</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td className="px-3">
                    <div className="flex items-center w-full">
                      <ShowLogo
                        name={subscription.title}
                        showImage={subscription.showImage}
                      />
                      <span className="data relative left-8">
                        {subscription.title}
                      </span>
                    </div>
                  </td>
                  <td className="data p-3">
                    {subscription.price} {subscription.currency}
                  </td>
                  <td className="px-3">
                    <span className="text-text-muted">
                      {getDaysUntil(subscription.nextBillingDate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingPaymentsList;
