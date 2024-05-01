import { Link } from "react-router-dom";
import "../css/urbanNest.css";

const Hero = () => {
  return (
    <div className="bg-orange pb-16 pt-16" style={{ backgroundImage: 'url("src/assets/holidayInn8.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}>
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="sm:text-4xl md:text-4xl lg:text-4xl  pl-5 text-white font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Book the moment, stay a lifetime. 
        </h1>
        <p className="sm:text-sm md:text-base lg:text-xl  pl-5 text-white" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)' }}>
          Discover elegance, discover comfort, discover your home away from home.
        </p>
        <div className="p-5">
        <Link to="/search" className="bg-white text-orange font-bold py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out self-start lg:self-center max-w-xs mx-auto lg:py-3">
          Explore Now
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
