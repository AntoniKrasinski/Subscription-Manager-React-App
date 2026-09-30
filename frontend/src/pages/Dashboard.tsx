import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
import { useLogout, useUser } from "../lib/auth.ts";
import AppLayout from "../components/layouts/AppLayout.tsx";
import SmallCard from "../components/UI/SmallCard.tsx";
import { useGetSubscriptionsStats } from "../features/subscriptions/api/getSubscriptionsStats.ts";
import { useNavigate } from "react-router";
import { usePreferences } from "../features/settings/api/GetPreferences.ts";
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
  if (!preferences.isLoading) {
    console.log(preferences.data.currency);
  }

  return (
    <ProtectedRoute>
      <AppLayout>
        <div>
          <h2>Welcome, {user.isPending ? "..." : user.data?.name}!</h2>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 gap-6">
          <SmallCard
            title="Total Subscriptions"
            data={
              stats.isPending ? "..." : stats.data!.activeSubscriptionsCount
            }
            subTitle="Ammount of your subscrpiotns"
          >
            123
          </SmallCard>
          <SmallCard
            title="Monthly Costs"
            data={`${stats.isPending ? "..." : stats.data!.thisMonthSpending} ${preferences.isPending ? "..." : `${preferences.data.currency}/mounth`}`}
            subTitle="123"
          >
            123
          </SmallCard>
          <SmallCard
            title="Yearly Costs"
            data={stats.isPending ? "..." : stats.data!.yearlySpending}
            subTitle="123"
          >
            123
          </SmallCard>
        </div>
        <button onClick={() => logoutMutatuon.mutate()}> log out</button>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
