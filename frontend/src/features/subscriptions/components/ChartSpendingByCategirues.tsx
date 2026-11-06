import React, { useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { subscriptionCategories } from "../../../lib/subscriptionCategories";
import Toggle from "../../../components/common/Toogle";
import Card from "../../../components/UI/Card";
import { useGetSubscriptionsCategoriesStats } from "../api/getSubscriptionsStats";
import { usePreferences } from "../../settings/api/GetPreferences";

const CardChartSpendingByCategirues = () => {
  const [monthlyYearlyToggle, setMonthlyYearlyToggle] = useState<"Mo" | "Yr">(
    "Mo",
  );

  const [chartKey, setChartKey] = useState(0);
  const replayAnimation = () => {
    setChartKey((prev) => prev + 1);
  };

  const categoriesStats = useGetSubscriptionsCategoriesStats();
  const userPreferences = usePreferences();
  console.log(categoriesStats.data);

  const data = Object.entries(
    categoriesStats.data?.subscriptionCategoriesStats ?? {},
  ).map(([category, stats]) => ({
    name: category,
    value:
      monthlyYearlyToggle === "Mo"
        ? stats.monthlySpending
        : stats.yearlySpending,
    fill: subscriptionCategories[
      category as keyof typeof subscriptionCategories
    ],
  }));

  return (
    <Card
      title="Spending by categories"
      className=" col-span-5 row-span-full"
      action={
        <Toggle
          options={["Mo", "Yr"]}
          onChange={() => {
            if (monthlyYearlyToggle == "Mo") {
              setMonthlyYearlyToggle("Yr");
            } else {
              setMonthlyYearlyToggle("Mo");
            }
            replayAnimation();
          }}
          value={monthlyYearlyToggle}
        />
      }
    >
      {categoriesStats.isLoading ||
      userPreferences.isLoading ||
      categoriesStats.isError ||
      userPreferences.isLoading ||
      categoriesStats.isError ? (
        <></>
      ) : !Object.keys(categoriesStats.data!.subscriptionCategoriesStats)
          .length ? (
        <></>
      ) : (
        <div className="flex min-h-0 flex- items-center gap-6 w-full">
          <div className="w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart key={chartKey}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={4}
                  stroke="none"
                  animationDuration={800}
                />

                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)} ${userPreferences.data!.currency}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {data
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>

                  <span className="text-sm font-medium">
                    {item.value} {userPreferences.data!.currency}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CardChartSpendingByCategirues;
