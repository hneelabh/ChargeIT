import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import bgImage from "../bg.jpg";

function Cancel() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    checkBookings();
  }, []);

  const checkBookings = async () => {
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings/");

    try {
      const snapshot = await get(bookingsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBookings(bookingsList);
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };

  const redirectToHome = () => {
    navigate("/");
  };

  const handleCancelBooking = async (bookingId) => {
    const db = getDatabase();
    const bookingRef = ref(db, `bookings/${bookingId}`);

    try {
      await remove(bookingRef);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      alert("Booking has been cancelled.");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
      <div className="mx-auto max-w-lg py-4 px-8 bg-white opacity-80 shadow-lg rounded-lg relative z-10">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold">My Bookings</p>
        </div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-xl font-bold mb-2">You have a booking with:</p>
              <p className="text-lg">
                <strong>Name:</strong> {booking.name}
              </p>
              <p className="text-lg">
                <strong>Vehicle ID:</strong> {booking.vehicleNumber}
              </p>
              <p className="text-lg">
                <strong>Location:</strong> {booking.selectedLocation}
              </p>
              <p className="text-lg">
                <strong>Time:</strong> {booking.bookingTime}
              </p>
              <p className="text-lg">
                <strong>Vehicle Type:</strong> {booking.vehicleType}
              </p>
              <p className="text-lg">
                <strong>Charging Type:</strong> {booking.chargingType}
              </p>
              <div className="mt-2 text-center">
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
        <div className="text-center my-4">
          <button
            onClick={redirectToHome}
            className="text-gray-600 underline px-4 py-2 rounded focus:outline-none"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;