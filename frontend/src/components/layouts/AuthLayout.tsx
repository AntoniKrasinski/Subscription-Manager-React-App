import React from "react";
import { useUser } from "../../lib/auth";
import { Navigate } from "react-router";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useUser();

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (data) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
};

export default AuthLayout;
