import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import "../css/urbanNest.css";

const SignOutButton = () => {
  const { showToast } = useAppContext();

  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      // Invalidate the "validateToken" query to reflect the user's signed-out state
      await queryClient.invalidateQueries("validateToken");

      // Show a success message
      showToast({ message: "Signed out Successfully!", type: "SUCCESS" });
    },
    // On error during sign-out
    onError: (error: Error) => {
      // Show an error message
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    // Trigger the sign-out mutation
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-orange rounded-md p-2 shadow-md px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
