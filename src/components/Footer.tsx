import { Link } from "react-router-dom";
import "../css/urbanNest.css";

const Footer = () => {
  return (
    <div className="bg-gray-800 py-10">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <img
              src="src/assets/UrbanNestLogo.png"
              alt="UrbanNest.com"
              className="w-32 h-14 rounded-md"
            />
          </Link>
          <p className="mt-4 text-gray-300">Discover your dream home with UrbanNest</p>
        </div>

        <div className="mt-6 md:mt-0 text-center md:text-left">
          <h3 className="text-orange font-bold mb-4">Quick Links</h3>
          <div className="flex flex-col md:flex-col md:justify-start gap-2">
            <Link className="text-gray-300 hover:text-white" to="/privacy-policy">Privacy Policy</Link>
            <Link className="text-gray-300 hover:text-white" to="/terms-of-service">Terms of Service</Link>
            <Link className="text-gray-300 hover:text-white" to="/contactus">Contact Us</Link>
            <Link className="text-gray-300 hover:text-white" to="/aboutus">About Us</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-600 flex justify-center">
        <p className="text-gray-300 text-sm py-4">
          © {new Date().getFullYear()} UrbanNest. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
