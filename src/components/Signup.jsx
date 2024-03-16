import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useFormik } from "formik";
import { signUpSchema } from "../Schemas";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Signup() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        console.log("The values are : ", values);
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        action.resetForm();
      },
    });

  // Check if the user is logged in and not in the loading state
  if (user && !loading) {
    // Redirect to another page or handle the scenario when the user is already logged in
    alert("Logged in successfully!");
    navigate("/"); // Replace with the desired route
    return null; // Return null to prevent rendering the signup form
  }

  return (
    <div
      className="min-h-screen bg-cover bg-black flex items-center justify-center"
    >
      <div className="max-w-md w-full py-12 px-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome!</h1>
        <h3 className="text-lg text-gray-800 text-center mb-8">
          Please enter your details below
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              autoComplete="off"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              autoComplete="off"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
            {errors.confirm_password && touched.confirm_password && (
              <p className="text-red-500 text-xs italic">
                {errors.confirm_password}
              </p>
            )}
          </div>
          <div className="mb-6 text-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <div className="mb-6 text-center">
            <GoogleSignInButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

