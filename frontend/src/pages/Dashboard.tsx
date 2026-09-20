import React from "react";
import { useAddSubscription } from "../features/subscriptions/api/subscriptionCreate.ts";
import type { Subscription } from "../types/api.ts";
import LogoutButton from "../features/auth/components/LogoutButton.tsx";
import ProtectedRoute from "../components/layouts/ProtectedRoute.tsx";
const Dashboard = () => {
  const data: Subscription = {
    userId: "123",
    price: 10.0,
    title: "123gfdsa",
    billingCycle: "weekly",
    category: "sport",
    currency: "usd",
  };
  const subscriptionMutation = useAddSubscription();
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
      <div className="flex flex-col">
        <button
          onClick={() => {
            subscriptionMutation.mutate(data);
          }}
        >
          TEST
        </button>
        <LogoutButton />
        <button onClick={() => {}}>REFRESHTOKEN</button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
