import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const {
    data: hotels,
    isLoading,
    refetch,
  } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  const handleCancelBooking = async (bookingId: string, hotelId: string) => {
    try {
      console.log("booking id", bookingId, hotelId);
      await apiClient.cancelBooking(bookingId, hotelId);

      refetch();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
      <div className="  grid grid-cols-1 gap-5">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="grid bg-gray-300 grid-cols-1 lg:grid-cols-[250px,1fr] gap-0 lg:gap-8">
              <div className="w-full h-[250px] relative">
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 flex  flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{hotel.name}</h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {hotel.city}, {hotel.country}
                  </p>
                  <ul className="mt-4">
                    {hotel.bookings.map((booking, index) => (
                      <li key={index} className="mb-2">
                        <span className="font-bold mr-2">Dates:</span>
                        <span>
                          {new Date(booking.checkIn).toDateString()} -{" "}
                          {new Date(booking.checkOut).toDateString()}
                        </span>
                        <br />
                        <span className="font-bold mr-2">Guests:</span>
                        <span>
                          {booking.adultCount} adults, {booking.childCount}{" "}
                          children
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-right">
                  {hotel.bookings.map((booking) => (
                    <button
                      key={booking._id}
                      onClick={() =>
                        handleCancelBooking(booking._id, hotel._id)
                      }
                      disabled={isLoading} 
                      className="px-4 py-2 font-bold bg-orange text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 transition duration-300 ease-in-out"
                    >
                      Cancel Booking
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
