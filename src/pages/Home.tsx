import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

 
  const limitedHotels = hotels ? hotels.slice(0, 6) : [];

  return (
    <div className="space-y-3">
      <div className="text-left">
        <h2 className="text-3xl text-orange font-bold mb-4">Travel opens your heart</h2>
        <p className="text-gray-600">
          Explore the world with our latest destinations, carefully curated by
          our hosts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {limitedHotels.map((hotel) => (
          <LatestDestinationCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
