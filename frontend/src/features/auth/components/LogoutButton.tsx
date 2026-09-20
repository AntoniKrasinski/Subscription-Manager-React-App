import React from "react";
import { useLogout } from "../../../lib/auth";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout({
    onSuccess: () => {
      navigate("/login");
    },
  });
  return (
    <button
      onClick={() => {
        logoutMutation.mutate();
      }}
    >
      LOG OUT
    </button>
  );
};

export default LogoutButton;
