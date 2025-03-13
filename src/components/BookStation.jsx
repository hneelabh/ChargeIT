import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  push,
  set,
  onValue,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import bgImage from "../images/bg.jpg";
import EDAPALLY from "../station_edapally.jpg";
import FORT from "../station_fort.jpg";
import KALMASSERY from "../station_kalamassery.jpg";
import VITYILLA from "../station_vytilla.jpg";

const auth = getAuth();

function BookStation() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [batteryPercentage, setBatteryPercentage] = useState("");
  const [bestStation, setBestStation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [slotAvailability, setSlotAvailability] = useState("");
  const [queuedStations, setQueuedStations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchBoxRefCurrentLocation = useRef(null);
  const searchBoxRefDestination = useRef(null);
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "key",
    libraries: ["places"],
  });

  // Define the Firestore collection reference
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
      setLoading(false);

      // If user is logged in, check for notifications
      if (user) {
        fetchUserNotifications(user.uid);
        fetchUserQueuedStations(user.uid);
      }
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

  // Function to fetch user's notifications
  const fetchUserNotifications = (userId) => {
    const db = getDatabase();
    const notificationsRef = ref(db, `notifications/${userId}`);

    onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const notificationsData = snapshot.val();
        const notificationsList = Object.keys(notificationsData).map((key) => ({
          id: key,
          ...notificationsData[key],
        }));
        setNotifications(notificationsList);
      } else {
        setNotifications([]);
      }
    });
  };

  // Function to fetch user's queued stations
  const fetchUserQueuedStations = (userId) => {
    const db = getDatabase();
    const queueRef = ref(db, "queue");

    onValue(queueRef, (snapshot) => {
      if (snapshot.exists()) {
        const queueData = snapshot.val();
        const userQueuedStations = Object.keys(queueData)
          .filter((key) => queueData[key].userId === userId)
          .map((key) => ({
            id: key,
            ...queueData[key],
          }));
        setQueuedStations(userQueuedStations);
      } else {
        setQueuedStations([]);
      }
    });
  };

  // Function to mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    if (!currentUser) return;

    const db = getDatabase();
    const notificationRef = ref(
      db,
      `notifications/${currentUser.uid}/${notificationId}`
    );

    try {
      await set(notificationRef, {
        ...notifications.find((n) => n.id === notificationId),
        read: true,
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Function to join the queue for a station
  const joinQueue = async (station, bookingTime) => {
    if (!currentUser) {
      alert("Please log in to join the queue");
      return;
    }

    try {
      const db = getDatabase();
      const queueRef = ref(db, "queue");

      // Check if user is already in queue for this station and time
      const isAlreadyQueued = queuedStations.some(
        (item) =>
          item.stationName === station.station_name &&
          item.preferredTime === bookingTime
      );

      if (isAlreadyQueued) {
        alert("You are already in queue for this station and time slot!");
        return;
      }

      // Add user to queue
      const newQueueItem = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        stationName: station.station_name,
        preferredLocation: station.station_name,
        vehicleType: "four-wheeler", // This would ideally come from user profile or selection
        chargingType: "DC", // This would ideally come from user profile or selection
        preferredTime: bookingTime,
        timestamp: new Date().toISOString(),
      };

      const newQueueItemRef = push(queueRef);
      await set(newQueueItemRef, newQueueItem);

      alert("You'll be notified when a slot becomes available!");
    } catch (error) {
      console.error("Error joining queue:", error);
      alert("Failed to join queue. Please try again.");
    }
  };

  // Function to check slot availability based on current time
  const checkSlotAvailability = async (stationName) => {
    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Check if current time is around 7:30 (between 7:00 and 7:59)
      if (currentHour === 7) {
        const db = getDatabase();
        const bookingsRef = ref(db, "bookings");
        const queryForExistingBooking = await get(
          query(
            bookingsRef,
            orderByChild("selectedLocation"),
            equalTo(stationName)
          )
        );

        const existingBookings = queryForExistingBooking.val();
        const nextTimeSlot = "8:00 - 9:00";

        if (existingBookings) {
          const bookingsArray = Object.values(existingBookings);
          const isSlotBooked = bookingsArray.some(
            (booking) => booking.bookingTime === nextTimeSlot
          );

          return isSlotBooked
            ? `8:00 - 9:00 slot NOT available at ${stationName}`
            : `8:00 - 9:00 slot AVAILABLE at ${stationName}`;
        } else {
          return `8:00 - 9:00 slot AVAILABLE at ${stationName}`;
        }
      } else {
        return ""; // Don't show availability for other hours
      }
    } catch (error) {
      console.error("Error checking slot availability:", error);
      return "Error checking slot availability";
    }
  };

  async function fetchBestChargingStation(
    location,
    destinationCoords,
    battery
  ) {
    try {
      const [latitude, longitude] = location.split(",");
      const requestBody = {
        current_location: [parseFloat(latitude), parseFloat(longitude)],
        destination: [destinationCoords.lat(), destinationCoords.lng()],
        battery_percentage: parseFloat(battery),
      };

      console.log("Sending data:", requestBody);

      const response = await fetch(
        "http://127.0.0.1:5000/api/nearest-stations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log("Fetched stations:", result);

      if (!result || result.length === 0) {
        setErrorMessage("No available charging stations found.");
        setBestStation(null);
        return;
      }

      const db = getDatabase();
      let availableStation = null;
      const now = new Date();
      const bookTime = roundUpTime(now);

      for (const station of result) {
        const bookingsRef = ref(db, "bookings");
        const queryForExistingBooking = await get(
          query(
            bookingsRef,
            orderByChild("selectedLocation"),
            equalTo(station.station_name)
          )
        );

        const existingBookings = queryForExistingBooking.val();
        let isSlotAvailable = true;

        if (existingBookings) {
          const bookingsArray = Object.values(existingBookings);
          isSlotAvailable = !bookingsArray.some(
            (booking) => booking.bookingTime + 1 === bookTime
          );
        }

        if (isSlotAvailable) {
          availableStation = station;
          break;
        }
      }

      if (availableStation) {
        // Check the 8:00-9:00 slot availability for this station
        const availability = await checkSlotAvailability(
          availableStation.station_name
        );
        setSlotAvailability(availability);
        setBestStation([availableStation]);
        setErrorMessage("");
      } else {
        setErrorMessage(
          "No available slots at any station. Please try again later."
        );
        setBestStation(null);
        setSlotAvailability("");
      }

      // After processing all stations
      // Check slot availability for all returned stations and add to them
      const stationsWithAvailability = await Promise.all(
        result.map(async (station) => {
          // Check if the slot is available
          const db = getDatabase();
          const bookingsRef = ref(db, "bookings");
          const queryForExistingBooking = await get(
            query(
              bookingsRef,
              orderByChild("selectedLocation"),
              equalTo(station.station_name)
            )
          );

          const existingBookings = queryForExistingBooking.val();
          const now = new Date();
          const bookTime = roundUpTime(now);
          let isSlotAvailable = true;

          if (existingBookings) {
            const bookingsArray = Object.values(existingBookings);
            isSlotAvailable = !bookingsArray.some(
              (booking) => booking.bookingTime === bookTime
            );
          }

          // Check if user is already in queue for this station
          let isInQueue = false;
          if (currentUser) {
            isInQueue = queuedStations.some(
              (item) =>
                item.stationName === station.station_name &&
                item.preferredTime === bookTime
            );
          }

          return {
            ...station,
            isSlotAvailable: isSlotAvailable,
            slotStatus: isSlotAvailable
              ? `${bookTime} slot AVAILABLE`
              : `${bookTime} slot NOT AVAILABLE`,
            currentTimeSlot: bookTime,
            isInQueue: isInQueue,
          };
        })
      );

      setBestStation(stationsWithAvailability);
    } catch (error) {
      console.error("Error fetching best station:", error);
      setErrorMessage("An error occurred while fetching the best station.");
    }
  }

  // Function to round up time to the nearest booking slot
  const roundUpTime = (date) => {
    const minutes = date.getMinutes();
    const hours = date.getHours();

    // Assuming booking slots are in 1-hour intervals, round up to the next hour
    const roundedHour = minutes > 0 ? hours + 1 : hours;
    return `${roundedHour}:00 - ${roundedHour + 1}:00`;
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const locationString = `${latitude},${longitude}`;
          setCurrentLocation(locationString);
          console.log(
            `📍 Location: ${latitude}, ${longitude} (Accuracy: ${accuracy}m)`
          );

          if (accuracy > 50) {
            console.warn(
              "⚠️ Location accuracy is low. Try moving to an open area."
            );
          }

          resolve(locationString);
        },
        async (error) => {
          console.warn("❌ Geolocation error:", error.message);

          // Fallback to IP-based location if user denies GPS access
          if (error.code === error.PERMISSION_DENIED) {
            console.warn("🌐 Fetching approximate location via IP...");

            try {
              const response = await fetch("https://ipapi.co/json/");
              const data = await response.json();
              if (data.latitude && data.longitude) {
                const ipLocation = `${data.latitude},${data.longitude}`;
                setCurrentLocation(ipLocation);
                resolve(ipLocation);
              } else {
                reject("Failed to fetch location from IP.");
              }
            } catch (err) {
              reject("IP-based location failed: " + err.message);
            }
          } else {
            reject(error.message);
          }
        },
        options
      );
    });
  };

  const handleGetLocationClick = async () => {
    try {
      await getCurrentLocation();
    } catch (error) {
      console.error("❌ Error:", error);
      setErrorMessage("Failed to get your location. Please enter it manually.");
    }
  };

  const handlePlacesChanged = (isDestination = true) => {
    const places = isDestination
      ? searchBoxRefDestination.current.getPlaces()
      : searchBoxRefCurrentLocation.current.getPlaces();

    if (places && places.length > 0) {
      const place = places[0];
      if (isDestination) {
        setDestination(place.formatted_address);
        setSelectedPlace(place);
      } else {
        // For current location, store as a string in the format "lat,lng"
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCurrentLocation(`${lat},${lng}`);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentLocation) {
      setErrorMessage("Please provide your current location.");
      return;
    }

    if (!selectedPlace) {
      setErrorMessage("Please enter a valid destination.");
      return;
    }

    if (!batteryPercentage) {
      setErrorMessage("Please enter your battery percentage.");
      return;
    }

    fetchBestChargingStation(
      currentLocation,
      selectedPlace.geometry.location,
      batteryPercentage
    );
  };

  function handleBookNow(stationAddress) {
    if (isLoggedIn && stationAddress) {
      console.log(`Booking for station: ${stationAddress}`);
      navigate(`/book?address=${stationAddress}`);
    } else {
      console.log("Please log in to book a slot");
    }
  }

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
        return bgImage;
    }
  }

  // Function to toggle notifications panel
  const toggleNotificationsPanel = () => {
    setShowNotifications(!showNotifications);
  };

  if (loading || !isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 pointer-events-none"></div>

      {/* Notifications icon with badge */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleNotificationsPanel}
            className="bg-white p-2 rounded-full shadow-lg relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Notifications panel */}
      {showNotifications && (
        <div className="absolute top-16 right-4 z-20 bg-white rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-lg mb-2">Notifications</h3>

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 mb-2 rounded ${
                  notification.read ? "bg-gray-100" : "bg-green-100"
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                {!notification.read && (
                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="text-xs text-blue-500 mt-1"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notifications</p>
          )}
        </div>
      )}

      <div className="container mx-auto p-4">
        <div className="mb-8 text-3xl text-green-200 text-center font-bold">
          Find the Best Charging Station
        </div>

        {/* Current location display */}
        {currentLocation && (
          <div className="mb-4 text-white text-center">
            <h2>Your Current Location:</h2>
            <p>
              Latitude: {currentLocation.split(",")[0]}, Longitude:{" "}
              {currentLocation.split(",")[1]}
            </p>
          </div>
        )}

        {/* Google Map */}
        <div className="mb-8">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={
              currentLocation
                ? {
                    lat: parseFloat(currentLocation.split(",")[0]),
                    lng: parseFloat(currentLocation.split(",")[1]),
                  }
                : { lat: 10.0, lng: 76.3 } // Default to Kochi, Kerala
            }
            zoom={15}
          >
            {currentLocation && (
              <Marker
                position={{
                  lat: parseFloat(currentLocation.split(",")[0]),
                  lng: parseFloat(currentLocation.split(",")[1]),
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Form for input */}
        <form onSubmit={handleSubmit} className="mb-8 text-center">
          <div className="mb-4">
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRefCurrentLocation.current = ref)}
              onPlacesChanged={() => handlePlacesChanged(false)}
            >
              <input
                type="text"
                placeholder="Enter Current Location"
                className="p-2 w-full border rounded"
              />
            </StandaloneSearchBox>
          </div>

          <button
            type="button"
            onClick={handleGetLocationClick}
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full mb-4"
          >
            Get Current Location
          </button>

          <div className="mb-4">
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRefDestination.current = ref)}
              onPlacesChanged={() => handlePlacesChanged(true)}
            >
              <input
                type="text"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </StandaloneSearchBox>
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter Battery Percentage"
              value={batteryPercentage}
              onChange={(e) => setBatteryPercentage(e.target.value)}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
          >
            Find Best Station
          </button>
        </form>

        {/* Display Error Message or Best Charging Station */}
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : bestStation && bestStation.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {bestStation.map((station, index) => (
              <div
                key={index}
                className="rounded overflow-hidden opacity-70 shadow-lg bg-white max-w-md mx-2 mb-4"
                style={{ flex: "1 0 30%", maxWidth: "30%" }}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={getImageByAddress(station.station_name)}
                  alt={station.station_name}
                />
                <div className="px-6 py-4">
                  <h1 className="font-bold text-xl mb-2">
                    {station.station_name}
                  </h1>
                  <p>
                    Distance to Station:{" "}
                    {station.distance_to_station.toFixed(2)} km
                  </p>
                  <p>
                    Distance to Destination:{" "}
                    {station.distance_to_destination.toFixed(2)} km
                  </p>
                  <p>Charging Speed: {station.charging_speed} kW</p>
                  <p>Total ETA: {Math.ceil(station.total_eta / 60)} minutes</p>

                  {/* Display slot availability status */}
                  <p
                    className={
                      station.isSlotAvailable
                        ? "text-green-600 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    {station.slotStatus}
                  </p>

                  {/* Show Book Now button or Notify Me button */}
                  {isLoggedIn && station.isSlotAvailable ? (
                    <button
                      className="mt-4 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleBookNow(station.station_name)}
                    >
                      Book Now
                    </button>
                  ) : isLoggedIn && !station.isSlotAvailable ? (
                    station.isInQueue ? (
                      <div className="mt-4">
                        <button
                          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed"
                          disabled
                        >
                          In Queue
                        </button>
                        <p className="text-sm text-gray-600 mt-1">
                          You'll be notified when a slot becomes available
                        </p>
                      </div>
                    ) : (
                      <button
                        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() =>
                          joinQueue(station, station.currentTimeSlot)
                        }
                      >
                        Notify Me
                      </button>
                    )
                  ) : (
                    <p className="mt-4 text-gray-700">
                      Please log in to book or get notifications
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">
            No suitable station found yet. Enter your information and click
            "Find Best Station".
          </p>
        )}
      </div>
    </div>
  );
}

export default BookStation;
