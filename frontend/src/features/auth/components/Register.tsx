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
    <div>
      <form
        onSubmit={handleSubmit((userData) => registerMutation.mutate(userData))}
        className="flex flex-col"
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
        <button className="border" type="submit">
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
