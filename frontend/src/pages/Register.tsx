import React from "react";
import RegisterForm from "../features/auth/components/Register";
import AuthLayout from "../components/layouts/AuthLayout";
const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
