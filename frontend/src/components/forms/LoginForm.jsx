import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";

import useLogin from "../../hooks/useLogin";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response.success) {
          const { accessToken, refreshToken, user } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          login(user);

          toast.success(response.message || "Login Successful");

          navigate("/dashboard");
        } else {
          toast.error(response.message || "Login Failed");
        }
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email or Username"
        name="emailOrUsername"
        placeholder="Enter your email or username"
        register={(name) =>
          register(name, {
            required: "Email or Username is required",
          })
        }
        error={errors.emailOrUsername}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        register={(name) =>
          register(name, {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })
        }
        error={errors.password}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="mt-2"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;