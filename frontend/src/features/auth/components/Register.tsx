import { Link } from "react-router";
import { useRegister } from "../../../lib/auth";
import type { RegisterInput } from "../../../lib/auth";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useRegister({
    onSuccess: () => navigate("/dashboard"),
  });

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
      <h1 className="mb-6">Create an account</h1>
      <form
        onSubmit={handleSubmit((userData) => registerMutation.mutate(userData))}
        className="flex flex-col gap-3"
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          required
        />
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
        <button className="bigButton mt-3" type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="mt-5 text-center">
        Already have an account? <Link className="text-primary" to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
