import React, { useState } from "react";
import { Link } from "react-router";
import { useRegister } from "../../../lib/auth";
import type { RegisterInput } from "../../../lib/auth";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
  });

  const registerMutation = useRegister({
    onSuccess: () => navigate("/dashboard"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate(userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="name"
          value={userData.name}
          onChange={handleChange}
          required
        />
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
        <button className="border" type="submit">
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
