import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Stripe public key retrieved from environment variables
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Type definition for the application context
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

// Creating the React context
const AppContext = React.createContext<AppContext | undefined>(undefined);

// Asynchronously loading the Stripe object
const stripePromise = loadStripe(STRIPE_PUB_KEY);

// AppContextProvider component that serves as the context provider
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State for managing toast messages
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // UseQuery hook to check if the user is logged in by validating the token
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
      }}
    >
      {/* Display the Toast component if a toast message is present */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for accessing the application context within components
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
