import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center space-x-2">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
          </div>

          <div className="overflow-x-auto whitespace-nowrap mb-8">
            {hotel.imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="inline-block border border-gray-200 rounded-md overflow-hidden mr-4 h-64"
              >
                <img
                  src={imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Guest Information</h2>
            <GuestInfoForm
              pricePerNight={hotel.pricePerNight}
              hotelId={hotel._id}
            />
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{hotel.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {hotel.facilities.map((facility, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4"
              >
                {facility}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
