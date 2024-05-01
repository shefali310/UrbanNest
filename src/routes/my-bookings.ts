import express, { Request, Response } from "express";
import verifyToken from "../../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../../src/models/hotel";

const router = express.Router();

// /api/my-bookings

// Fetch bookings associated with the authenticated user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    // Map over the hotels and filter bookings for the authenticated user
    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      // Create a new HotelType object with filtered user bookings
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

// DELETE /api/my-bookings/:bookingId
router.delete("/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const { hotelId } = req.query;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const bookingIndex = hotel.bookings.findIndex(
      (booking) => booking._id.toString() === bookingId
    );

    if (bookingIndex !== -1) {
      hotel.bookings.splice(bookingIndex, 1);
      await hotel.save();
      return res
        .status(200)
        .json({ message: "Booking cancelled successfully" });
    } else {
      return res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});
export default router;
