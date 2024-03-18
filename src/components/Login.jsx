import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useFormik } from "formik";
import GoogleSignInButton from "./GoogleSignInButton";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const redirectToSignup = () => {
    navigate("/signup");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values, action) => {
        try {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          alert("Login successful");
          window.location.reload();
        } catch (error) {
          console.error("Login error:", error.message);
        }
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
      className="relative flex bg-black items-center justify-center min-h-screen"
    >
      <div className="max-w-md w-full py-12 px-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Welcome!</h1>
        <h3 className="text-lg text-gray-800 text-center mb-6">Login to <span className="font-semibold font-serif">Charge IT</span></h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-bold mb-2" 
            >
              Email
            </label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="border rounded-lg py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="mb-6 text-center">
            <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">Login</button>
          </div>
        </form>
        <div className="mb-6 text-center">
            <GoogleSignInButton />
        </div>

        {/* <p className="text-center text-gray-700 text-sm">New User? <a className="text-green-700 hover:text-green-500" href="/signup">Sign Up</a></p> */}
        <p className="text-center text-gray-700 text-sm">New User?
          <button onClick={redirectToSignup} className="hover:text-green-500 ml-1 text-green-700 hover:underline">
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
