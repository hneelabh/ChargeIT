import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchHistory(user.email);
      } else {
        setIsLoggedIn(false);
        setHistory([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchHistory = (email) => {
    const db = getDatabase();
    const sanitizedEmail = email.replace(/\./g, "_"); // Convert email to a valid key
    const historyRef = ref(db, `bookings/${sanitizedEmail}`);

    onValue(historyRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedHistory = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setHistory(formattedHistory);
      } else {
        setHistory([]);
      }
    });
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      <div className="mx-auto w-full max-w-screen-xl py-4 px-8 shadow-lg rounded-lg relative z-10 bg-black">
        <div className="text-center mb-6">
          <p className="text-5xl text-white mb-8 font-semibold">
            Your Booking History
          </p>
        </div>
        {history.length > 0 ? (
          <ul className="flex flex-wrap justify-center -mx-4">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 px-4"
              >
                <div className="p-4 bg-gray-900 text-white rounded-lg">
                  <p className="text-xl font-bold mb-2">Booking Details:</p>
                  <p className="text-lg">
                    <strong>Name:</strong> {entry.name}
                  </p>
                  <p className="text-lg">
                    <strong>Vechicle:</strong> {entry.vehicleNumber}
                  </p>
                  <p className="text-lg">
                    <strong>Date:</strong>{" "}
                    {new Date(entry.date).toLocaleString()}
                  </p>
                  <p className="text-lg">
                    <strong>Status:</strong> {entry.status}
                  </p>
                  <p className="text-lg">
                    <strong>Details:</strong> {entry.details}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center w-full text-white">No history available.</p>
        )}
      </div>
      <div className="text-center my-4">
        <button
          onClick={redirectToHome}
          className="text-gray-500 underline px-4 py-2 rounded focus:outline-none"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default BookingHistory;
