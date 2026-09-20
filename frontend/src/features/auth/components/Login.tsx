import React, { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../../../lib/auth";
import type { LoginInput } from "../../../lib/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const logining = useLogin({ onSuccess: () => navigate("/dashboard") });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    logining.mutate(userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Login;
