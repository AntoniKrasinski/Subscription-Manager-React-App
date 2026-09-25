import React from "react";
import LoginForm from "../features/auth/components/Login";
import AuthLayout from "../components/layouts/AuthLayout";
const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
