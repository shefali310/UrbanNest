import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/urbanNest.css";

// Define the form data interface for registration
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
};

const Register = () => {
  // Access the query client for managing queries in React Query
  const queryClient = useQueryClient();

  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // Access the showToast function from the AppContext
  const { showToast } = useAppContext();

  // Use react-hook-form to manage form state and validation
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Use react-query mutation for handling the registration API call
  const mutation = useMutation(apiClient.register, {
    // On successful registration
    onSuccess: async () => {
      // Show a success message
      showToast({ message: "Registration Successful!", type: "SUCCESS" });

      // Invalidate the "validateToken" query to reflect the user's signed-in state
      await queryClient.invalidateQueries("validateToken");

      // Navigate to the home page
      navigate("/");
    },
    // On error during registration
    onError: (error: Error) => {
      // Show an error message
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // Handle form submission
  const onSubmit = handleSubmit((data) => {
    // Trigger the registration mutation
    mutation.mutate(data);
  });

  // Render the Register component with the registration form
  return (
    <form
      className="flex flex-col rounded-md bg-gray-200 gap-5 mx-auto max-w-md p-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl text-orange text-left font-bold">
        Create an Account
      </h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

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
              message: "password must be at least  6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Re-enter Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      {/* Add role selection */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Role
        <select
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('role', { required: 'Please select a role' })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <span className="text-red-500">{errors.role.message}</span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already a member?{" "}
          <Link to="/sign-in" className="font-bold underline">
            Login
          </Link>
        </span>
        <button
          type="submit"
          className="bg-orange text-white p-2 rounded font-bold"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
