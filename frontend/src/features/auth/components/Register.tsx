import React,{useState} from 'react'
import { Link } from 'react-router';

interface UserData {
  email: string;
  password: string;
}

const Register = () => {
const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>)
}

export default Register