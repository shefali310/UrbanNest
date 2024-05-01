import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsersWithHotels } from "../api-client";
import { HotelType } from "../../../back-end/src/models/hotel";

const AdminUserBookingInfo: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [hotels, setHotels] = useState<HotelType[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsData = await fetchUsersWithHotels(userId);
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl text-orange font-bold text-center mb-8">
        User Bookings Details
      </h1>
      {hotels.length === 0 ? (
        <div className="text-center mt-4">No hotels booked by this user</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Hotel</th>
                <th className="p-3">Image</th>
                <th className="p-3">Dates and Guests Information</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel._id} className="border-b border-gray-300">
                  <td className="p-3">
                    <div className="font-semibold">{hotel.name}</div>
                    <div className="text-gray-500">
                      {hotel.city}, {hotel.country}
                    </div>
                  </td>
                  <td className="p-3">
                    <img
                      src={hotel.imageUrls[0]}
                      alt={hotel.name}
                      className="w-full h-auto sm:w-62 sm:h-52 object-cover"
                    />
                  </td>
                  <td className="p-3">
                    <ul>
                      {hotel.bookings.map((booking, index) => (
                        <li key={index} className="mb-4">
                          <div className="mb-2">
                            <span className="font-semibold">Guests:</span>
                            <span className="ml-2">
                              {booking.adultCount} adults, {booking.childCount}{" "}
                              children
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold">Total Cost:</span>
                            <span className="ml-2">${booking.totalCost} </span>
                          </div>
                          <div className="border border-gray-300 rounded-md p-2 mb-4">
                            <div className="mb-2">
                              <span className="font-semibold">Check-in:</span>
                              <span className="ml-2">
                                {new Date(booking.checkIn).toDateString()}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Check-out:</span>
                              <span className="ml-2">
                                {new Date(booking.checkOut).toDateString()}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                Selected Room:
                              </span>
                              <span className="ml-2">
                                {booking.selectedRoom}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserBookingInfo;
