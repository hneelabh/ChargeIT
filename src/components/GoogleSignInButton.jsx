import React from "react";
import { signInWithGoogle } from "../config/firebase.js";
import { FcGoogle } from 'react-icons/fc';

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // You can perform additional actions after successful Google sign-in if needed
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <button
        className="flex items-center justify-center text-gray-700 font-bold py-2 px-4 rounded-full border border-gray-700 hover:border-green-700 hover:text-green-700"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="mr-2" color="#4285F4" /> Continue with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;

