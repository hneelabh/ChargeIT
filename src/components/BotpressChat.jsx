import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  push,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Clock, MapPin, Car, BatteryCharging, Calendar } from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBookingSlot, setIsBookingSlot] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [newBooking, setNewBooking] = useState({
    name: "",
    vehicleNumber: "",
    selectedLocation: "",
    vehicleType: "two-wheeler",
    chargingType: "AC",
    bookingTime: "",
  });
  const locations = ["EDAPALLY", "FORT", "KALMASSERY", "VITYLLA"];
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateTimeOptions = () => {
    const options = [];
    const currentHour = new Date().getHours();

    for (let hour = currentHour; hour < 24; hour++) {
      options.push(`${hour}:00 - ${hour + 1}:00`);
    }
    for (let hour = 0; hour < currentHour; hour++) {
      options.push(`${hour}:00 - ${hour + 1}:00 (next-day)`);
    }
    return options;
  };

  const fetchUserBookings = async () => {
    if (!userEmail) {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Please sign in to view your bookings.",
          sender: "bot",
        },
      ]);
      return [];
    }

    const db = getDatabase();
    const bookingsRef = ref(db, "bookings");
    const userBookingsQuery = query(
      bookingsRef,
      orderByChild("userEmail"),
      equalTo(userEmail)
    );

    try {
      const snapshot = await get(userBookingsQuery);
      return snapshot.val() ? Object.values(snapshot.val()) : [];
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };

  const validateBookingTime = async (location, time) => {
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings");
    const locationQuery = query(
      bookingsRef,
      orderByChild("selectedLocation"),
      equalTo(location)
    );

    const snapshot = await get(locationQuery);
    if (snapshot.val()) {
      return !Object.values(snapshot.val()).some(
        (booking) => booking.bookingTime === time
      );
    }
    return true;
  };

  const handleBookingProcess = async (message) => {
    if (!userEmail) {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Please sign in to make a booking.",
          sender: "bot",
        },
      ]);
      setIsBookingSlot(false);
      return;
    }

    try {
      switch (bookingStep) {
        case 0:
          if (locations.includes(message.toUpperCase())) {
            setNewBooking((prev) => ({
              ...prev,
              selectedLocation: message.toUpperCase(),
              selectedAddress: message.toUpperCase(),
            }));
            setMessages((prev) => [
              ...prev,
              {
                text: "👤 Please enter your name:",
                sender: "bot",
              },
            ]);
            setBookingStep(1);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: `📍 Please select a valid location:\n${locations
                  .map((loc) => `• ${loc}`)
                  .join("\n")}`,
                sender: "bot",
              },
            ]);
          }
          break;

        case 1:
          if (message.trim()) {
            setNewBooking((prev) => ({ ...prev, name: message }));
            setMessages((prev) => [
              ...prev,
              {
                text: "🚗 Please enter your vehicle number:",
                sender: "bot",
              },
            ]);
            setBookingStep(2);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "⚠️ Please enter a valid name.",
                sender: "bot",
              },
            ]);
          }
          break;

        case 2:
          const db = getDatabase();
          const vehicleQuery = query(
            ref(db, "bookings"),
            orderByChild("vehicleNumber"),
            equalTo(message.trim().toUpperCase())
          );
          const vehicleSnapshot = await get(vehicleQuery);

          if (vehicleSnapshot.val()) {
            setMessages((prev) => [
              ...prev,
              {
                text: "⚠️ This vehicle number already has a booking. Please use a different vehicle number.",
                sender: "bot",
              },
            ]);
            return;
          }

          setNewBooking((prev) => ({
            ...prev,
            vehicleNumber: message.trim().toUpperCase(),
          }));
          setMessages((prev) => [
            ...prev,
            {
              text: "🔧 Select vehicle type:\n• Type '2' for Two Wheeler 🏍️\n• Type '4' for Four Wheeler 🚗",
              sender: "bot",
            },
          ]);
          setBookingStep(3);
          break;

        case 3:
          if (message === "2" || message === "4") {
            const vehicleType =
              message === "2" ? "two-wheeler" : "four-wheeler";
            setNewBooking((prev) => ({ ...prev, vehicleType }));

            if (vehicleType === "four-wheeler") {
              setMessages((prev) => [
                ...prev,
                {
                  text: "⚡ Select charging type:\n• Type 'AC' for AC Charging\n• Type 'DC' for DC Charging",
                  sender: "bot",
                },
              ]);
              setBookingStep(4);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  text:
                    "🕒 Available time slots:\n" +
                    generateTimeOptions()
                      .map((slot) => `• ${slot}`)
                      .join("\n"),
                  sender: "bot",
                },
              ]);
              setBookingStep(5);
            }
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "⚠️ Please enter either '2' for two-wheeler or '4' for four-wheeler",
                sender: "bot",
              },
            ]);
          }
          break;

        case 4:
          if (
            message.toUpperCase() === "AC" ||
            message.toUpperCase() === "DC"
          ) {
            setNewBooking((prev) => ({
              ...prev,
              chargingType: message.toUpperCase(),
            }));
            setMessages((prev) => [
              ...prev,
              {
                text:
                  "🕒 Available time slots:\n" +
                  generateTimeOptions()
                    .map((slot) => `• ${slot}`)
                    .join("\n"),
                sender: "bot",
              },
            ]);
            setBookingStep(5);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "⚠️ Please enter either 'AC' or 'DC'",
                sender: "bot",
              },
            ]);
          }
          break;

        case 5:
          const timeSlots = generateTimeOptions();
          if (timeSlots.includes(message)) {
            const userBookings = await fetchUserBookings();
            if (userBookings.length >= 3) {
              setMessages((prev) => [
                ...prev,
                {
                  text: "⚠️ You have reached the maximum limit of 3 bookings.",
                  sender: "bot",
                },
              ]);
              setIsBookingSlot(false);
              setBookingStep(0);
              return;
            }

            const isTimeSlotAvailable = await validateBookingTime(
              newBooking.selectedLocation,
              message
            );

            if (!isTimeSlotAvailable) {
              setMessages((prev) => [
                ...prev,
                {
                  text: "⚠️ This time slot is already booked. Please select another time.",
                  sender: "bot",
                },
              ]);
              return;
            }

            const db = getDatabase();
            const bookingsRef = ref(db, "bookings");
            const newBookingRef = push(bookingsRef);

            const finalBooking = {
              ...newBooking,
              bookingTime: message,
              userEmail: userEmail,
            };

            await set(newBookingRef, finalBooking);

            setMessages((prev) => [
              ...prev,
              {
                text: `✅ Booking Confirmed!\n\n📍 Location: ${finalBooking.selectedLocation}\n👤 Name: ${finalBooking.name}\n🚗 Vehicle: ${finalBooking.vehicleNumber}\n🔧 Type: ${finalBooking.vehicleType}\n⚡ Charging: ${finalBooking.chargingType}\n🕒 Time: ${finalBooking.bookingTime}`,
                sender: "bot",
              },
            ]);

            setIsBookingSlot(false);
            setBookingStep(0);
            setNewBooking({
              name: "",
              vehicleNumber: "",
              selectedLocation: "",
              vehicleType: "two-wheeler",
              chargingType: "AC",
              bookingTime: "",
            });
          } else {
            setMessages((prev) => [
              ...prev,
              {
                text: "⚠️ Please select a valid time slot from the list above.",
                sender: "bot",
              },
            ]);
          }
          break;
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ An error occurred during booking. Please try again.",
          sender: "bot",
        },
      ]);
      setIsBookingSlot(false);
      setBookingStep(0);
    }
  };

  const handleViewBookings = async () => {
    const bookings = await fetchUserBookings();
    if (bookings.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          text: "📭 You have no current bookings.",
          sender: "bot",
        },
      ]);
    } else {
      const bookingsList = bookings
        .map(
          (booking, index) =>
            `📑 Booking #${index + 1}\n` +
            `📍 Location: ${booking.selectedLocation}\n` +
            `🕒 Time: ${booking.bookingTime}\n` +
            `🚗 Vehicle: ${booking.vehicleNumber}\n` +
            `🔧 Type: ${booking.vehicleType}\n` +
            `⚡ Charging: ${booking.chargingType}\n` +
            "──────────────"
        )
        .join("\n\n");

      setMessages((prev) => [
        ...prev,
        {
          text: "📋 Your Current Bookings:\n\n" + bookingsList,
          sender: "bot",
        },
      ]);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setInput("");

    if (isBookingSlot) {
      await handleBookingProcess(message);
      return;
    }

    const lowerMessage = message.toLowerCase();
    if (lowerMessage === "book slot") {
      setIsBookingSlot(true);
      setBookingStep(0);
      setMessages((prev) => [
        ...prev,
        {
          text: `📍 Please select a location:\n${locations
            .map((loc) => `• ${loc}`)
            .join("\n")}`,
          sender: "bot",
        },
      ]);
      return;
    }

    if (lowerMessage === "view bookings") {
      await handleViewBookings();
      return;
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }],
        }
      );

      const botResponse =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't process that request. You can try:\n• Type 'book slot' to make a booking\n• Type 'view bookings' to see your current bookings";

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. You can:\n• Type 'book slot' to make a booking\n• Type 'view bookings' to see your bookings",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="flex flex-col w-full max-w-md p-4 bg-white/90 shadow-lg rounded-lg mt-10 mb-4 space-y-4 overflow-auto h-3/4">
        <div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-4">
          <h1 className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <BatteryCharging className="w-6 h-6" />
            EV Charging Assistant
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-4 rounded-xl shadow-md ${
                message.sender === "user"
                  ? "bg-green-500 text-white self-end rounded-br-none"
                  : "bg-white text-gray-800 self-start rounded-bl-none"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ node, inline, className, children, ...props }) => (
                    <code style={{ backgroundColor: "lightgray" }} {...props}>
                      {children}
                    </code>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
              ;
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="flex w-full max-w-md p-3 bg-white/95 rounded-lg shadow-lg space-x-2 items-center mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          className="w-full p-4 text-lg text-gray-800 border-2 border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
        />
        <button
          onClick={() => sendMessage(input)}
          className="p-4 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        >
          Send
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => sendMessage("book slot")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Calendar className="w-4 h-4" />
          Book Slot
        </button>
        <button
          onClick={() => sendMessage("view bookings")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Clock className="w-4 h-4" />
          View Bookings
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
