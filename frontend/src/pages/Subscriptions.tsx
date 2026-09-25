import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import AppLayout from "../components/layouts/AppLayout";
import SubscriptionsList from "../features/subscriptions/components/SubscriptionsList";
import AddSubscriptionButton from "../features/subscriptions/components/AddSubscriptionButton";

const Subscriptions = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="flex justify-between items-center">
          <h2>Subscriptions</h2> <AddSubscriptionButton />
        </div>
        <SubscriptionsList />
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Subscriptions;
