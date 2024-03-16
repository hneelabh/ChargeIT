
import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import bgImage from "../bg.jpg";

function Cancel() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Set the email state whenever the user's authentication state changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        checkBookings(user.email);
      } else {
        setEmail(null);
        setBookings([]);
      }
    });

    // Cleanup function to unsubscribe from the AuthStateChanged observer
    return unsubscribe;
  }, []);

  const checkBookings = async (userEmail) => {
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings/");

    try {
      const snapshot = await get(bookingsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsList = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((booking) => booking.userEmail === userEmail);

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
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      <div className="mx-auto w-full max-w-screen-xl py-4 px-8 shadow-lg rounded-lg relative z-10 bg-black">
        <div className="text-center mb-6">
          <p className="text-5xl text-white mb-8 font-semibold">My Bookings</p>
        </div>

        {/* conditional statement to check booking done or not  */}
        <div className="flex flex-wrap justify-center -mx-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4"
              >
                <div className="p-4 bg-gray-900 text-white rounded-lg">
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
              </div>
            ))
          ) : (
            <p className="text-center w-full">No bookings found.</p>
          )}
        </div>
        {/* redirect to home button */}
        <div className="text-center my-4">
          <button
            onClick={redirectToHome}
            className="text-gray-500 underline px-4 py-2 rounded focus:outline-none"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;

