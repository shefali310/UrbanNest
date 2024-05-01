import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import { useAppContext } from "./contexts/AppContext";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Profilepage from "./pages/Profilepage";
import UsersWithBookingsPage from "./pages/UsersWithBookingsPage";
import AdminUserBookingInfopage from "./pages/AdminUserBookingInfopage";


const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <Search   />
            </Layout>
          }
        />

        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgotPasswordPage />
            </Layout>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <Layout>
              <ResetPasswordPage />
            </Layout>
          }
        />

        <Route
          path="/aboutus"
          element={
            <Layout>
              <Aboutus />
            </Layout>
          }
        />

        <Route
          path="/contactus"
          element={
            <Layout>
              <Contactus />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/users-with-bookings"
              element={
                <Layout>
                  <UsersWithBookingsPage />
                </Layout>
              }
            />

            <Route
              path="/:userId/users-with-hotelbookings"
              element={
                <Layout>
                  <AdminUserBookingInfopage />
                </Layout>
              }
            />

            <Route
              path="/profile/:userId"
              element={
                <Layout>
                  <Profilepage />
                </Layout>
              }
            />

            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />

            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />

            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />

            
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
