import { HotelType } from "../../../back-end/src/models/hotel";
import { useRoomContext } from "./../contexts/RoomContext";
type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  const { selectedRoom } = useRoomContext();
  return (
    <div className="border rounded-lg  p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Booking Details</h2>

      <div className="mb-4">
        <p className="font-bold">{`${hotel.name}`}</p>
        <p className="font-bold">{`${hotel.city}, ${hotel.country}`}</p>
        <p className="text-gray-600">Location</p>
      </div>

      <div className="flex justify-between mb-4 gap-3">
        <div>
          <p className="font-bold">{checkIn.toDateString()}</p>
          <p className="text-gray-600">Check-in</p>
        </div>

        <div>
          <p className="font-bold">{checkOut.toDateString()}</p>
          <p className="text-gray-600">Check-out</p>
        </div>
      </div>

      <div className="border-t border-b py-2 mb-4">
        <p className="font-bold">{numberOfNights} nights</p>
        <p className="text-gray-600">Total length of stay</p>
      </div>

      <div>
        <p className="font-bold">{`${adultCount} adults & ${childCount} children`}</p>
        <p className="text-gray-600">Guests</p>
      </div>

      <div>
        <p>Selected Room: {selectedRoom}</p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
