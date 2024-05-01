import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/urbanNest.css";

// Define the form data interface for sign-in
export type SignInFormData = {
  email: string;
  password: string;
};


const SignIn = () => {

  // Access the showToast function from the AppContext
  const { showToast } = useAppContext();
  
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();
  
  // Access the query client for managing queries in React Query
  const queryClient = useQueryClient();

  // Use react-hook-form to manage form state and validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  // Use react-query mutation for handling the sign-in API call
  const mutation = useMutation(apiClient.signIn, {
    // On successful sign-in
    onSuccess: async () => {
      // Show a success message
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      
      // Invalidate the "validateToken" query to reflect the user's signed-in state
      await queryClient.invalidateQueries("validateToken");
      
      // Navigate to the home page
      navigate("/");
    },
    // On error during sign-in
    onError: (error: Error) => {
      // Show an error message
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // Handle form submission
  const onSubmit = handleSubmit((data) => {
    // Trigger the sign-in mutation
    mutation.mutate(data);
  });

  // Render the SignIn component with the sign-in form
  return (
    <form
      className="flex flex-col bg-gray-200 rounded-md gap-5 mx-auto max-w-md p-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl text-orange font-bold ">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link to="/register" className="font-bold underline">
            Create an account
          </Link>
        </span>
        <span className="text-sm">
          <Link to="/forgot-password" className="font-bold underline">
            Forgot password?
          </Link>
        </span>
      </span>

      <div className="w-200">
        <button
          type="submit"
          className="bg-orange text-white p-2 rounded font-bold"
        >
          Login
        </button>
      </div>
    </form>
  );
};


export default SignIn;
