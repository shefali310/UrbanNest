import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import "../css/urbanNest.css";

const ForgotPassword = () => {
  // State variable for email
  const [email, setEmail] = useState("");

  // Access the showToast function from the AppContext
  const { showToast } = useAppContext();

  // Handle the logic for initiating password reset
  const handleResetPassword = async () => {
    // Check if email is provided
    if (!email) {
      showToast({
        message: `Email is required`,
        type: "ERROR",
      });
      console.error("Email is required");
      return;
    }

    try {
      // Make a POST request to initiate password reset
      const response = await fetch(
        "http://localhost:3002/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        showToast({
          message: `Password reset link sent to ${email}`,
          type: "SUCCESS",
        });
      } else {
        // If the request was not successful, display an error message
        const responseData = await response.json();
        showToast({
          message: `Email is not exist`,
          type: "ERROR",
        });

        console.error(
          "Failed to initiate password reset:",
          responseData.message
        );
      }
    } catch (error) {
      // Handle any unexpected errors during the password reset initiation process
      console.error("Error initiating password reset:", error);
    }
  };

  // Render the ForgotPassword component with input field and a continue button
  return (
    <div className="flex flex-col bg-gray-200 rounded-md pb-5 items-center mt-50 w-full">
      <h6 className="text-2xl text-dark font-bold mb-4 p-3">
        Enter the email associated with your account to reset your password.
      </h6>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-3 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange rounded font-bold text-white p-2"
        onClick={handleResetPassword}
      >
        Continue
      </button>
    </div>
  );
};

export default ForgotPassword;
