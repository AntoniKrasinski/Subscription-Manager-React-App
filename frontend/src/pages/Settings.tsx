import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import AppLayout from "../components/layouts/AppLayout";

const Settings = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div>Settings</div>
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Settings;
