import React from "react";
import { useUser } from "../../lib/auth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useUser();

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (!data || isError) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
