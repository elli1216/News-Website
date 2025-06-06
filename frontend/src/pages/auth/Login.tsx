import { Link } from "react-router-dom";
import { useCallback, memo } from "react";
import { useMutation } from "@tanstack/react-query";
import { isEmailValid, isPasswordValid } from "../../utils";
import { login } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: LoginForm["email"];
      password: LoginForm["password"];
    }) => {
      try {
        const { user } = await login(email, password);
        return user;
      } catch (error: any) {
        console.error("Error signing in:", error);
        throw new Error(error.message || "Failed to sign in");
      }
    },
    onSuccess: () => {
      toast.success("Successfully logged in!");
      navigate("/home");
    },
    onError: (error: Error) => {
      toast.error("Failed to sign in");
      console.error("Error signing in:", error);
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    },
    [formData, loginMutation]
  );

  return (
    <div className="flex flex-col items-center justify-center h-fit border-[#0000] border-2 p-16 rounded-md shadow-2xl">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 w-[25vw]"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          className="input input-bordered w-full max-w-xs"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          className="btn btn-primary w-full max-w-xs"
          type="submit"
          disabled={
            !isEmailValid(formData.email) ||
            !isPasswordValid(formData.password) ||
            loginMutation.isPending
          }
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
        <h1 className="text-center">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="btn-link">
            Sign up
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default memo(Login);
