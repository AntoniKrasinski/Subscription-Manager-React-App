import React from "react";
import { useUser } from "../../lib/auth";
import { Navigate } from "react-router";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return <div className="flex min-h-dvh items-center justify-center p-4">...loading</div>;
  }

  if (data) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-bg p-4 sm:p-8">
      {children}
    </main>
  );
};

export default AuthLayout;
