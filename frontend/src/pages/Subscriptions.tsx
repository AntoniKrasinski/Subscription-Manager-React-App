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
          <div className="">
            <h1>Subscriptions</h1>
            <p>Add and edit your subscriptions</p>
          </div> <AddSubscriptionButton />
        </div>
        <SubscriptionsList />
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Subscriptions;
