import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bgImage from "../bg.jpg";
import EDAPALLY from "../station_edapally.jpg";
import FORT from "../station_fort.jpg";
import KALMASSERY from "../station_kalamassery.jpg";
import VITYILLA from "../station_vytilla.jpg";

const auth = getAuth();

function Book() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  function getImageByAddress(address) {
    switch (address) {
      case "EDAPALLY":
        return EDAPALLY;
      case "FORT":
        return FORT;
      case "KALMASSERY":
        return KALMASSERY;
      case "VITYILLA":
        return VITYILLA;
      default:
        return null;
    }
  }

  function handleBookNow(address) {
    if (isLoggedIn) {
      console.log(`Booking for address: ${address}`);
      navigate(`/book?address=${address}`);
    } else {
      console.log("Please log in or sign up to book a slot");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto p-4">
        <div className="mb-8 text-3xl text-green-200 text-center font-bold">
          Please choose an address for slot booking
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded overflow-hidden opacity-70 shadow-lg bg-white"
            >
              <img
                className="w-full h-48 object-cover"
                src={getImageByAddress(user.address)}
                alt={user.address}
              />
              <div className="px-6 py-4">
                <h1 className="font-bold text-xl mb-2">
                  Address: {user.address}
                </h1>
                {isLoggedIn ? (
                  <button
                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleBookNow(user.address)}
                  >
                    Book Now
                  </button>
                ) : (
                  <p>Please log in or sign up to book a slot</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Book;
