import { Link } from "react-router-dom";
import { HotelType } from "../../../back-end/src/models/hotel";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer rounded-md shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="h-[300px] ">
        <img
          src={hotel.imageUrls[0]}
          alt={`${hotel.city} ${hotel.name}`}
          className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-70 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-lg">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
