import React from "react";
import { signInWithGoogle } from "../config/firebase.js";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button className="login-with-google-btn" onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
