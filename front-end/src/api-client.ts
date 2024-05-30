import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
import {
 
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
} from "../../back-end/src/shared/types";
import { UserType } from "../../back-end/src/shared/types";
import axios from "axios";

export type UserProfileResponse = {
  user: UserType;
};

// Access the API base URL from the Vite environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Make a POST request to register a user
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  // Throw an error if the response is not okay
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// Make a POST request to sign in a user
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  // Throw an error if the response is not okay
  if (!response.ok) {
    throw new Error(body.message);
  }

  // Return the response body
  return body;
};

// Make a request to validate the user's token
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  // Throw an error if the response is not okay
  if (!response.ok) {
    throw new Error("Token invalid");
  }

  // Return the response body as JSON
  return response.json();
};

// Make a POST request to sign out a user
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  // Throw an error if the response is not okay
  if (!response.ok) {
    throw new Error("Error during signout");
  }
};

// Make a POST request to add a hotel
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

// Make a request to fetch the user's hotels
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

// Make a request to fetch a hotel by ID
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

// Make a PUT request to update a hotel by ID
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

// Make a DELETE request to delete a hotel by ID
export const deleteMyHotel = async (hotelId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete hotel");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting hotel:", error);
    throw new Error("Error deleting hotel. Please try again later.");
  }
};

//Search parameters
export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

// Make a request to search for hotels

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  // Convert search parameters to URL query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

// Make a request to fetch all hotels
export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

// Make a request to fetch a hotel by ID
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

// Make a request to fetch the user's bookings
export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

// Make a POST request to create a payment intent for a booking
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

// Make a request to fetch the current user
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

// Make a request to fetch the current User Profile
export const fetchUserProfile = async (
  userId: string
): Promise<UserProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/users/profile/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user profile");
  }
  return response.json();
};

//  Function to fetch all users
export const fetchUsersWithBookings = async (): Promise<UserType[]> => {
  const response = await fetch(
    `${API_BASE_URL}/api/users-with-bookings/getallusers`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching users with bookings");
  }

  return response.json();
};

// fetch hotel data from user id
export const fetchUsersWithHotels = async (
  userId: string | undefined
): Promise<HotelType[]> => {
  try {
    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const response = await axios.get<HotelType[]>(
      `${API_BASE_URL}/api/users-with-bookings/hotelbyuserid/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users with hotels");
  }
};

// Make a POST request to create a room booking
export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

// Function to update the selected room for a booking
export const updateBookingRoom = async (
  bookingId: string,
  selectedRoom: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/hotels/bookings/${bookingId}/room`,

      { selectedRoom },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to update selected room for booking");
  }
};

// Function to cancel a booking
export const cancelBooking = async (bookingId: string, hotelId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/my-bookings/${bookingId}?hotelId=${hotelId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new Error("Error deleting booking. Please try again later.");
  }
};
