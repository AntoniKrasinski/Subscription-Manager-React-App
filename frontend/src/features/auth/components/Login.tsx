import { Link } from "react-router";
import { useLogin } from "../../../lib/auth";
import type { LoginInput } from "../../../lib/auth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logining = useLogin({ onSuccess: () => navigate("/dashboard") });

  return (
    <div>
      <form
        onSubmit={handleSubmit((userData) => logining.mutate(userData))}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </div>
  );
};

export default Login;
