import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkPassword, isEmailValid, isPasswordValid } from "../../utils";
import { signup } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async ({
      fullName,
      email,
      password,
    }: {
      fullName: SignupForm["fullName"];
      email: SignupForm["email"];
      password: SignupForm["password"];
    }) => {
      try {
        const { user } = await signup(fullName, email, password);
        return user;
      } catch (error: any) {
        console.error("Error signing up:", error);
        throw new Error(error.message || "Failed to sign up");
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      navigate("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account");
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      signupMutation.mutate({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    },
    [formData, signupMutation]
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
        <h1 className="text-2xl font-bold">Signup</h1>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
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
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            checkPassword(e.target.value, confirmPassword);
          }}
        />
        <input
          className="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            checkPassword(formData.password, e.target.value);
          }}
        />
        {checkPassword(formData.password, confirmPassword).length > 0 && (
          <ul className="text-[0.8em] text-red-500 text-start">
            {checkPassword(formData.password, confirmPassword).map(
              (message) => (
                <li key={Math.random() * 10}>* {message}</li>
              )
            )}
          </ul>
        )}
        <button
          className="btn btn-primary w-full max-w-xs"
          type="submit"
          disabled={
            !isEmailValid(formData.email) ||
            !isPasswordValid(formData.password) ||
            confirmPassword !== formData.password ||
            checkPassword(formData.password, confirmPassword).length > 0 ||
            signupMutation.isPending
          }
        >
          {signupMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Signup"
          )}
        </button>
        <h1 className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="btn-link">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default memo(Signup);
