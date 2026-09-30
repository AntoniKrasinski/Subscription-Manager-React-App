import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import AppLayout from "../components/layouts/AppLayout";
import SettingsForm from "../features/settings/components/SettingsForm";

const Settings = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <SettingsForm />
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Settings;
