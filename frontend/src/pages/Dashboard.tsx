import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
import { useLogout, useUser } from "../lib/auth.ts";
import AppLayout from "../components/layouts/AppLayout.tsx";
import SmallCard from "../components/UI/SmallCard.tsx";
import { useGetSubscriptionsStats } from "../features/subscriptions/api/getSubscriptionsStats.ts";
import { useNavigate } from "react-router";
import { usePreferences } from "../features/settings/api/GetPreferences.ts";
import Skeleton from "../components/UI/Skeleton.tsx";
import Error from "../components/UI/Error.tsx";
const Dashboard = () => {
  const user = useUser();
  const preferences = usePreferences();
  const stats = useGetSubscriptionsStats();
  const navigate = useNavigate();
  const logoutMutatuon = useLogout({
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <ProtectedRoute>
      <AppLayout>
        {user.isLoading || preferences.isLoading || stats.isLoading ? (
          <Skeleton />
        ) : user.data && preferences.data && stats.data ? (
          <>
            <div>
              <h2>Welcome, {user.data.name}</h2>
            </div>
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <SmallCard
                title="Total Subscriptions"
                data={stats.data.activeSubscriptionsCount}
                subTitle="Ammount of your subscrpiotns"
              >
                123
              </SmallCard>
              <SmallCard
                title="Monthly Costs"
                data={`${stats.data.thisMonthSpending} ${preferences.data.currency}/mounth`}
                subTitle="123"
              >
                123
              </SmallCard>
              <SmallCard
                title="Yearly Costs"
                data={`${stats.data.yearlySpending} ${preferences.data.currency}/year`}
                subTitle="123"
              >
                123
              </SmallCard>
            </div>
            <button onClick={() => logoutMutatuon.mutate()}> log out</button>
          </>
        ) : (
          <Error />
        )}
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
