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
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
      <h1 className="mb-6">Sign in</h1>
      <form
        onSubmit={handleSubmit((userData) => logining.mutate(userData))}
        className="flex flex-col gap-3"
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
        <button className="bigButton mt-3" type="submit" disabled={logining.isPending}>
          {logining.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-5 text-center">
        No account? <Link className="text-primary" to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
