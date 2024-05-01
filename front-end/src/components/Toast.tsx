import { useEffect } from "react";
import "../css/urbanNest.css";

// Define the props for the Toast component
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

// Toast component
const Toast = ({ message, type, onClose }: ToastProps) => {
  // Use useEffect to set a timer for auto-closing the toast after 5 seconds
  useEffect(() => {
    // Set a timer to call onClose after 5000 milliseconds (5 seconds)
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // Cleanup function to clear the timer when the component unmounts or re-renders
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  // Determine the styles based on the type of toast (SUCCESS or ERROR)
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 p-4 rounded-md bg-green-600 text-white max-w-md z-50"
      : "fixed top-4 right-4 p-4 rounded-md bg-red-600 text-white max-w-md z-50";

  // Render the Toast component with appropriate styles and content
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};


export default Toast;
