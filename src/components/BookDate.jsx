// import React, { useState, useEffect } from "react";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   get,
//   query,
//   orderByChild,
//   equalTo,
// } from "firebase/database";
// import { useNavigate, useLocation } from "react-router-dom";
// import bgImage from "../bg.jpg";

// function BookDate() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [name, setName] = useState("");
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [bookTime, setBookTime] = useState("");
//   const [vehicleType, setVehicleType] = useState("two-wheeler"); // Default value
//   const [chargingType, setChargingType] = useState("AC"); // Default value
//   const [locations] = useState(["EDAPALLY", "FORT", "KALMASSERY", "VITYILLA"]);
//   const [selectedLocation, setSelectedLocation] = useState("");

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const addressFromQuery = searchParams.get("address");

//     if (addressFromQuery) {
//       setSelectedAddress(addressFromQuery);
//       setSelectedLocation(addressFromQuery);
//     }

//     // Create the "bookedLocations" node if it doesn't exist
//     const db = getDatabase();
//     const bookedLocationsRef = ref(db, "bookedLocations");
//     get(bookedLocationsRef).then((snapshot) => {
//       if (!snapshot.exists()) {
//         set(bookedLocationsRef, {});
//       }
//     });
//   }, [location.search]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !vehicleNumber || !bookTime || !selectedLocation) {
//       alert("Please fill all the fields");
//     } else {
//       await checkAndWriteUserData();
//     }
//   };

//   const checkAndWriteUserData = async () => {
//     const db = getDatabase();
//     const bookingsRef = ref(db, "bookings");

//     // Check if the user has already booked with the same vehicle number
//     const querySnapshot = await get(
//       query(bookingsRef, orderByChild("vehicleNumber"), equalTo(vehicleNumber))
//     );
//     const existingBookings = querySnapshot.val();

//     if (existingBookings) {
//       alert(
//         `You have already made a booking with the vehicle number ${vehicleNumber}.`
//       );
//       return;
//     }

//     // Check if there is an existing booking at the same time and location
//     const queryForExistingBooking = await get(
//       query(
//         bookingsRef,
//         orderByChild("selectedLocation"),
//         equalTo(selectedLocation)
//       )
//     );
//     const existingBookingsAtSameLocation = queryForExistingBooking.val();

//     if (existingBookingsAtSameLocation) {
//       const bookingsArray = Object.values(existingBookingsAtSameLocation);
//       const conflictingBooking = bookingsArray.find(
//         (booking) => booking.bookingTime === bookTime
//       );

//       if (conflictingBooking) {
//         alert(
//           `There is already a booking at ${bookTime} for ${selectedLocation}. Please choose a different time slot or location.`
//         );
//         return;
//       }
//     }

//     // Create a new booking
//     const newBookingRef = push(bookingsRef);
//     const newBookingKey = newBookingRef.key;
//     await set(ref(db, `/bookings/${newBookingKey}`), {
//       name: name,
//       vehicleNumber: vehicleNumber,
//       selectedAddress: selectedAddress,
//       selectedLocation: selectedLocation,
//       bookingTime: bookTime,
//       vehicleType: vehicleType,
//       chargingType: chargingType,
//     });

//     alert("Your booking has been made");
//     redirectToCancel();
//   };

//   // Function to generate time options
//   const generateTimeOptions = () => {
//     const options = [];
//     const currentHour = new Date().getHours(); // Get the current hour
//     const nextDay = new Date();
//     nextDay.setDate(nextDay.getDate() + 1); // Get the date for the next day

//     // Loop through hours from current hour to 23 (end of current day)
//     for (let hour = currentHour + 1; hour < 24; hour++) {
//       const startTime = `${hour}:00`;
//       const endTime = `${hour + 1}:00`;
//       options.push(`${startTime} - ${endTime}`);
//     }

//     // Loop through hours from 0 (beginning of next day) to 1 (end of next day)
//     for (let hour = 0; hour < currentHour; hour++) {
//       const startTime = `${hour}:00`;
//       const endTime = `${hour + 1}:00`;
//       options.push(`${startTime} - ${endTime} (next-day)`);
//     }

//     return options;
//   };

//   const redirectToCancel = () => {
//     navigate("/cancel");
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="bg-white p-8 opacity-80 rounded shadow-md max-w-md w-full">
//         <div className="text-center mb-6">
//           <p className="text-lg font-semibold">Time you would like to Book</p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* Existing form fields */}
//           <div className="mb-4">
//             <input
//               type="text"
//               id="name"
//               placeholder="Your Name"
//               className="border p-2 w-full"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               id="vehicle-number"
//               placeholder="Vehicle Number"
//               className="border p-2 w-full"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="selected-location">Select Location:</label>
//             <select
//               id="selected-location"
//               className="border p-2 w-full"
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//             >
//               {locations.map((location, index) => (
//                 <option key={index} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Vehicle type selection */}
//           <div className="mb-4">
//             <label htmlFor="vehicle-type">Select Vehicle Type:</label>
//             <select
//               id="vehicle-type"
//               className="border p-2 w-full"
//               value={vehicleType}
//               onChange={(e) => setVehicleType(e.target.value)}
//             >
//               <option value="two-wheeler">Two Wheeler</option>
//               <option value="four-wheeler">Four Wheeler</option>
//             </select>
//           </div>

//           {/* Charging type selection */}
//           {vehicleType === "four-wheeler" && (
//             <div className="mb-4">
//               <label htmlFor="charging-type">Select Charging Type:</label>
//               <select
//                 id="charging-type"
//                 className="border p-2 w-full"
//                 value={chargingType}
//                 onChange={(e) => setChargingType(e.target.value)}
//               >
//                 <option value="AC">AC Charging</option>
//                 <option value="DC">DC Charging</option>
//               </select>
//             </div>
//           )}

//           {/* Time selection */}
//           <div className="mb-4">
//             <select
//               id="book-time"
//               className="border p-2 w-full"
//               value={bookTime}
//               onChange={(e) => setBookTime(e.target.value)}
//             >
//               {generateTimeOptions().map((time, index) => (
//                 <option key={index} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Submit button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-500 focus:outline-none"
//             >
//               Book
//             </button>
//           </div>
//         </form>

//         {/* Button to navigate to cancel page */}
//         <div className="mt-4 text-center">
//           <button
//             onClick={redirectToCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none"
//           >
//             Go to My Bookings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDate;

import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import bgImage from "../bg.jpg";

function BookDate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [vehicleType, setVehicleType] = useState("two-wheeler"); // Default value
  const [chargingType, setChargingType] = useState("AC"); // Default value
  const [locations] = useState(["EDAPALLY", "FORT", "KALMASSERY", "VITYILLA"]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const addressFromQuery = searchParams.get("address");

    if (addressFromQuery) {
      setSelectedAddress(addressFromQuery);
      setSelectedLocation(addressFromQuery);
    }

    // Create the "bookedLocations" node
    const db = getDatabase();
    const bookedLocationsRef = ref(db, "bookedLocations");
    get(bookedLocationsRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(bookedLocationsRef, {});
      }
    });
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;

    if (!name || !vehicleNumber || !bookTime || !selectedLocation) {
      alert("Please fill all the fields");
    } else {
      await checkAndWriteUserData(userId);
    }
  };

  const checkAndWriteUserData = async (userId) => {
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings");

    //count for the 3 bookings
    const queryForUserBookings = await get(
      query(bookingsRef, orderByChild("userId"), equalTo(userId))
    );
    const existingUserBookings = queryForUserBookings.val();
    const userBookingCount = existingUserBookings
      ? Object.keys(existingUserBookings).length
      : 0;

    if (userBookingCount >= 3) {
      alert(
        "You have already made 3 bookings. You cannot make any more bookings."
      );
      return;
    }

    // Check if the user has already booked with the same vehicle number
    const querySnapshot = await get(
      query(bookingsRef, orderByChild("vehicleNumber"), equalTo(vehicleNumber))
    );
    const existingBookings = querySnapshot.val();

    if (existingBookings) {
      alert(
        `You have already made a booking with the vehicle number ${vehicleNumber}.`
      );
      return;
    }

    // Check if there is an existing booking at the same time and location
    const queryForExistingBooking = await get(
      query(
        bookingsRef,
        orderByChild("selectedLocation"),
        equalTo(selectedLocation)
      )
    );
    const existingBookingsAtSameLocation = queryForExistingBooking.val();

    if (existingBookingsAtSameLocation) {
      const bookingsArray = Object.values(existingBookingsAtSameLocation);
      const conflictingBooking = bookingsArray.find(
        (booking) => booking.bookingTime === bookTime
      );

      if (conflictingBooking) {
        alert(
          `There is already a booking at ${bookTime} for ${selectedLocation}. Please choose a different time slot or location.`
        );
        return;
      }
    }

    // Create a new booking
    const newBookingRef = push(bookingsRef);
    const newBookingKey = newBookingRef.key;
    await set(ref(db, `/bookings/${newBookingKey}`), {
      name: name,
      vehicleNumber: vehicleNumber,
      selectedAddress: selectedAddress,
      selectedLocation: selectedLocation,
      bookingTime: bookTime,
      vehicleType: vehicleType,
      chargingType: chargingType,
      userId: userId,
    });

    alert("Your booking has been made");
    redirectToCancel();
  };

  // Function to generate time options
  const generateTimeOptions = () => {
    const options = [];
    const currentHour = new Date().getHours(); // Get the current hour
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1); // Get the date for the next day

    // Loop through hours from current hour to 23 (end of current day)
    for (let hour = currentHour + 1; hour < 24; hour++) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 1}:00`;
      options.push(`${startTime} - ${endTime}`);
    }

    // Loop through hours from 0 (beginning of next day) to 1 (end of next day)
    for (let hour = 0; hour < currentHour; hour++) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 1}:00`;
      options.push(`${startTime} - ${endTime} (next-day)`);
    }

    return options;
  };

  const redirectToCancel = () => {
    navigate("/cancel");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold">Time you would like to Book</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Existing form fields */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="border p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="vehicle-number"
              placeholder="Vehicle Number"
              className="border p-2 w-full"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="selected-location">Select Location:</label>
            <select
              id="selected-location"
              className="border p-2 w-full"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle type selection */}
          <div className="mb-4">
            <label htmlFor="vehicle-type">Select Vehicle Type:</label>
            <select
              id="vehicle-type"
              className="border p-2 w-full"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="two-wheeler">Two Wheeler</option>
              <option value="four-wheeler">Four Wheeler</option>
            </select>
          </div>

          {/* Charging type selection */}
          {vehicleType === "four-wheeler" && (
            <div className="mb-4">
              <label htmlFor="charging-type">Select Charging Type:</label>
              <select
                id="charging-type"
                className="border p-2 w-full"
                value={chargingType}
                onChange={(e) => setChargingType(e.target.value)}
              >
                <option value="AC">AC Charging</option>
                <option value="DC">DC Charging</option>
              </select>
            </div>
          )}

          {/* Time selection */}
          <div className="mb-4">
            <select
              id="book-time"
              className="border p-2 w-full"
              value={bookTime}
              onChange={(e) => setBookTime(e.target.value)}
            >
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-500 focus:outline-none"
            >
              Book
            </button>
          </div>
        </form>

        {/* Button to navigate to cancel page */}
        <div className="mt-4 text-center">
          <button
            onClick={redirectToCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDate;
