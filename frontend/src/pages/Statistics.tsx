import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import AppLayout from "../components/layouts/AppLayout";

const Statistics = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div>Statistics</div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Statistics;
