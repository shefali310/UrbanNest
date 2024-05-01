import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import "../css/urbanNest.css";

// Define the expected parameters for the ResetPassword component
interface ResetPasswordParams {
  token: string | undefined;
  [key: string]: string | undefined;
}

const ResetPassword = () => {
  // Access the showToast function from the AppContext
  const { showToast } = useAppContext();

  // Retrieve the token from the URL parameters
  const { token } = useParams<ResetPasswordParams>();
  
  // State variables for password and confirm password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // Handle the logic for resetting the password
  const handleResetPassword = async () => {
    // Check if both password and confirm password are provided
    if (!password || !confirmPassword) {
      showToast({
        message: `Enter both passwords!`,
        type: "ERROR",
      });

      console.error("Please enter both password and confirm password");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      showToast({
        message: `Passwords do not match`,
        type: "ERROR",
      });
      console.error("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to reset the password using the provided token
      const response = await fetch(
        `http://localhost:3002/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        showToast({
          message: `Password reset Successful!`,
          type: "SUCCESS",
        });

        // Navigate to the sign-in page upon successful password reset
        navigate("/sign-in");
      } else {
        // If the request was not successful, display an error message
        const responseData = await response.json();

        showToast({
          message: `Failed to reset password`,
          type: "ERROR",
        });
        console.error("Failed to reset password:", responseData.message);
      }
    } catch (error) {
      // Handle any unexpected errors during the password reset process
      console.error("Error resetting password:", error);
    }
  };

  // Render the ResetPassword component with input fields and a reset button
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl text-orange font-bold mb-4">
        Reset your Password here:
      </h2>
      <input
        type="password"
        placeholder="Enter your new password"
        className="border p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm your new password"
        className="border p-2 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="bg-orange text-white font-bold p-2" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};


export default ResetPassword;
