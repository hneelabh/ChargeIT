import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
// import { db } from "../firebase-config";
import { getDatabase } from "firebase/database";
import { useNavigate} from "react-router-dom";

function BookBattery() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address, phone } = formData;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const db = getDatabase();
        const batteryRef = ref(db, "battery");
        const newBookingRef = push(batteryRef);
        await set(newBookingRef, formData);
        alert("Booking successful");
        setFormData({ name: "", email: "", address: "", phone: "" });
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Error submitting booking. Please try again later.");
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover flex items-center bg-black justify-center"
    >
      <div className="max-w-md w-full py-12 px-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-4">EV Lifeline Express</h1>
        <h3 className="text-lg text-gray-600 text-center mb-8">
          Please enter your details below
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address:
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              autoComplete="off"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">{errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone:
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="+91"
              autoComplete="off"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
          <div className="mb-6 text-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center my-4">
          <button
            onClick={redirectToHome}
            className="text-gray-800 underline px-4 py-2 rounded focus:outline-none"
          >
            Back to Homepage
          </button>
        </div>
      </div>

    </div>
  );
}

export default BookBattery;
