import React, { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { Link as RouterLink } from 'react-router-dom';


import olas1pro from "../vehicle_img/olas1pro.jpg";
import olas1x from "../vehicle_img/olas1x.jpg";
import aether450s from "../vehicle_img/aether450s.webp";
import aether450x from "../vehicle_img/aether450x.webp";
import okayafreedom from "../vehicle_img/okayafreedom.webp";
import ampereprimus from "../vehicle_img/ampereprimus.webp";
import heroatrialx from "../vehicle_img/heroatrialx.jpg";
import tvsiqube from "../vehicle_img/tvsiqube.webp";

function Vehicle() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "scooters");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getBikeLink = (bikeName) => {
    switch (bikeName) {
      case "OLA S1 pro":
        return "https://www.olaelectric.com/s1-pro";
      case "OLA S1X":
        return "https://www.olaelectric.com/s1-x";
      case "Aether 450 S":
        return "https://www.atherenergy.com/450S";
      case "Aether 450X":
        return "https://www.atherenergy.com/450X";
      case "Okaaya Freedom":
        return "https://okayaev.com/e-scooters/FREEDUM";
      case "Ampere Primus":
        return "https://ampere.greaveselectricmobility.com/primus";
      case "Hero Atria LX":
        return "https://heroelectric.in/bike/atria-lx/";
      case "TVS Iqube":
        return "https://www.tvsmotor.com/electric-vehicle/tvs-iqube/tvs-iqube-variant-details";
      default:
        return "#"; // Default link if no match is found
    }
  };

  // Mapping between bike name and its corresponding image
  const bikeImages = {
    "OLA S1 pro": olas1pro,
    "OLA S1X": olas1x,
    "Aether 450 S": aether450s,
    "Aether 450X": aether450x,
    "Okaaya Freedom": okayafreedom,
    "Ampere Primus": ampereprimus,
    "Hero Atria LX": heroatrialx,
    "TVS Iqube": tvsiqube,
  };

  function handleBookNow(address) {
    if (isLoggedIn) {
      console.log(`Booking for address: ${address}`);
      navigate(`/book?address=${address}`);
    } else {
      console.log("Please log in or sign up to book a slot");
    }
  }

  return (
    <div
      name='vehicles'
      className="flex flex-wrap justify-center p-4 min-h-screen bg-black"
    >
      <div className="w-full text-center text-green-100 text-3xl font-bold mt-3 mb-5">
        Please choose the vehicle of your choice
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={bikeImages[user.name]} // Using the corresponding image for the bike
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-6 py-4">
              <h1 className="font-bold text-xl mb-2">Vehicle: {user.name}</h1>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => window.open(getBikeLink(user.name), "_blank")}
              >
                Vehicle Details
              </button>
              {isLoggedIn ? (
                <RouterLink to="https://shazam-08.github.io/maps/">
                  <button
                    className="float-right bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Book Now
                  </button>                  
                </RouterLink>
                  
                ) : (
                  <p>Please log in or sign up to book a slot</p>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Vehicle;