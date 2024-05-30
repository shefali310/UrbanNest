import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { UserType } from "../../../back-end/src/shared/types";
import { fetchCurrentUser } from "../api-client";
import "../css/urbanNest.css";
import { FaUser, FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn]); // Fetch user data whenever isLoggedIn changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 py-6 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl pl-5 md:text-xl text-orange font-bold tracking-tight">
          <Link to="/">
            <img
              src="imgs/UrbanNestLogo.png"
              alt="UrbanNest.com"
              className="w-32 h-14 rounded-md"
            />
          </Link>
        </span>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray mr-5 font-bold bg-white px-1 py-1"
          >
            <FaBars />
          </button>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-0 bg-white mr-4 p-4 shadow-md"
            >
              <Link to="/aboutus" className="block mb-2 text-orange font-bold">
                About&nbsp;us
              </Link>
              <Link
                to="/contactus"
                className="block mb-2 text-orange font-bold"
              >
                Contact&nbsp;us
              </Link>
              {isLoggedIn && currentUser ? (
                <>
                  {currentUser.role === "admin" && (
                    <>
                      <Link
                        className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                        to="/my-hotels"
                      >
                        My Hotels
                      </Link>
                      <Link
                        className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                        to="/users-with-bookings"
                      >
                        My Users
                      </Link>
                    </>
                  )}
                  {currentUser.role !== "admin" && (
                    <>
                      <Link
                        to="/my-bookings"
                        className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                      >
                        My Bookings
                      </Link>
                    </>
                  )}
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className="flex text-orange pl-8 pb-3 text-center px-3 md:px-6 font-bold "
                  >
                    <FaUser />
                  </Link>
                  <SignOutButton />
                </>
              ) : (
                <Link
                  to="/sign-in"
                  className="flex items-center rounded-md p-2 bg-white text-orange px-3 md:px-6 font-bold"
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </div>

        <span className="hidden md:flex space-x-2">
          <Link
            className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
            to="/aboutus"
          >
            About us
          </Link>
          <Link
            className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
            to="/contactus"
          >
            Contact us
          </Link>
          {isLoggedIn && currentUser ? (
            <>
              {currentUser.role === "admin" && (
                <>
                  <Link
                    className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                    to="/my-hotels"
                  >
                    My Hotels
                  </Link>
                  <Link
                    className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                    to="/users-with-bookings"
                  >
                    My Users
                  </Link>
                </>
              )}
              {currentUser.role !== "admin" && (
                <>
                  <Link
                    className="flex items-center text-orange px-3 md:px-6 font-bold hover:bg-white"
                    to="/my-bookings"
                  >
                    My Bookings
                  </Link>
                </>
              )}
              <Link
                to={`/profile/${currentUser._id}`}
                className="flex items-center text-white px-3 md:px-6 font-bold hover:text-orange "
              >
                <FaUser className="mr-2" />
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center rounded-md p-2 bg-white text-orange px-3 md:px-6 font-bold"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default Header;
