import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";

const MyHotels = () => {
  const { data: hotelData, refetch } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  const handleDelete = async (hotelId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hotel?");
    
    if (confirmDelete) {
      try {
        await apiClient.deleteMyHotel(hotelId);
        refetch();
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl text-orange font-bold mb-3 sm:mb-0">My hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-orange text-white font-bold p-2 hover:bg-gray-400"
        >
          Add Hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-1 lg:grid-cols-2">
        {hotelData.map((hotel) => (
          <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{hotel.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="border bg-gray-300 rounded-lg shadow-lg p-3 flex items-center">
                <BsMap className="mr-2" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border bg-gray-300 rounded-lg shadow-lg p-3 flex items-center">
                <BsBuilding className="mr-2" />
                {hotel.type}
              </div>

              <div className="border bg-gray-300 rounded-lg shadow-lg p-3 flex items-center">
                <BiMoney className="mr-2" />$ {hotel.pricePerNight} per night
              </div>

              <div className="border bg-gray-300 rounded-lg shadow-lg p-3 flex items-center">
                <BiHotel className="mr-2" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>

              <div className="border bg-gray-300 rounded-lg shadow-lg p-3 flex items-center">
                <BiStar className="mr-2" />
                {hotel.starRating} Ratings
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-orange text-white font-bold p-2 hover:bg-gray-400"
              >
                View Hotel
              </Link>

              <Link
                to="#"
                onClick={() => handleDelete(hotel._id)}
                className="flex bg-red-500 text-white font-bold p-2 ml-3 hover:bg-red-700"
              >
                Delete Hotel
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
