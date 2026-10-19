import { CreditCard, Wallet, CalendarDays, TrendingUp } from "lucide-react";
import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
import { useUser } from "../lib/auth.ts";
import AppLayout from "../components/layouts/AppLayout.tsx";
import SmallCard from "../components/UI/SmallCard.tsx";
import Card from "../components/UI/Card.tsx";
import { useGetSubscriptionsStats } from "../features/subscriptions/api/getSubscriptionsStats.ts";
import { usePreferences } from "../features/settings/api/GetPreferences.ts";
import Skeleton from "../components/UI/Skeleton.tsx";
import Error from "../components/UI/Error.tsx";

const Dashboard = () => {
  const user = useUser();
  const preferences = usePreferences();
  const stats = useGetSubscriptionsStats();


  return (
    <ProtectedRoute>
      <AppLayout>
        {user.isLoading || preferences.isLoading || stats.isLoading ? (
          <Skeleton />
        ) : user.data && preferences.data && stats.data ? (
          <>
            <div>
              <h1>Welcome, {user.data.name}!</h1>
              <p>Take control of your subscriptions with SubRiver.</p>
            </div>

            <div className="grid grid-cols-4 grid-rows-1 gap-6">
              <SmallCard
                title="Total Subscriptions"
                data={stats.data.activeSubscriptionsCount}
                subTitle="Active subscriptions"
                iconClassName="bg-[#DDF3F5] text-[#0B7A85]"
              >
                <CreditCard size={18} />
              </SmallCard>
              <SmallCard
                title="This Month Costs"
                data={`${stats.data.thisMonthSpending}`}
                unit={preferences.data.currency}
                subTitle="Spent so far this month"
                iconClassName="bg-primary-soft text-primary"
              >
                <Wallet size={18} />
              </SmallCard>
              <SmallCard
                title="Monthly Costs"
                data={`${stats.data.monthlySpending}`}
                unit={`${preferences.data.currency} / month`}
                subTitle="Average monthly costs"
                iconClassName="bg-chart-5/10 text-chart-5"
              >
                <CalendarDays size={18} />
              </SmallCard>
              <SmallCard
                title="Yearly Costs"
                data={`${stats.data.yearlySpending}`}
                unit={`${preferences.data.currency} / year`}
                subTitle="Average yearly costs"
                iconClassName="bg-chart-4/10 text-chart-4"
              >
                <TrendingUp size={18} />
              </SmallCard>
            </div>
            <div className="grid grid-cols-12 h-full gap-6">
              <Card
                title="Upcoming payments"
                action="View all"
                className="col-span-7 row-span-full"
              ></Card>
              <Card
                title="Spending by categories"
                className=" col-span-5 row-span-full"
              >
                {" "}
                Add subscription first
              </Card>
            </div>
          </>
        ) : (
          <Error />
        )}
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
