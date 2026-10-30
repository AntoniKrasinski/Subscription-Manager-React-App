import React from "react";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import AppLayout from "../components/layouts/AppLayout";
import SettingsForm from "../features/settings/components/SettingsForm";

const Settings = () => {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="flex justify-between items-center">
          <div className="">
            <h1>Settings</h1>
            <p>Manage your account and preferences</p>
          </div>
        </div>
        <SettingsForm />
      </AppLayout>
    </ProtectedRoute>
  );
};

export default Settings;
