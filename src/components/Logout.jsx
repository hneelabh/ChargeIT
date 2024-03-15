import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";

function Logout() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the authentication state is determined
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    // If still loading, you can show a loading indicator or return null
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Welcome!</h1>
      <h3>This is just a test logout</h3>

      {user ? (
        <div>
          <p>You are logged in as {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>You are currently logged out</p>
      )}
    </>
  );
}

export default Logout;
