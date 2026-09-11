import React, { useState } from "react";
import { Link } from "react-router";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await loginUser(userData);
    if (!user) {
      console.log("get out");
    } else {
      console.log("you are velcome");
    }
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
