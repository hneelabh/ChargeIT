// import React, { useState, useEffect } from "react";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase.js";

// function Logout() {
//   const [user, setUser] = useState(auth.currentUser);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Set loading to false once the authentication state is determined
//     });

//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//   };

//   if (loading) {
//     // If still loading, you can show a loading indicator or return null
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <h1>Welcome!</h1>
//       <h3>This is just a test logout</h3>

//       {user ? (
//         <div>
//           <p>You are logged in as {user.email}</p>
//           <button onClick={logout}>Logout</button>
//         </div>
//       ) : (
//         <p>You are currently logged out</p>
//       )}
//     </>
//   );
// }

// export default Logout;

import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import bg from "../bg.jpg";

function Logout() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const redirectToMyBooking = () => {
    navigate("/cancel");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="bg-white px-6 py-8 rounded-md shadow-lg opacity-70">
        <h1 className="text-3xl font-bold mb-6">Hello fellow EV-Savvy people!</h1>

        {user ? (
          <div className="text-center">
            <p className="mb-4">You are currently logged in as {user.email}</p>
            <button
              onClick={redirectToMyBooking}
              className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4"
            >
              My Booking
            </button>
            <button
              onClick={logout}
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="text-center text-xl">
            <p className="mb-4">Click <button onClick={redirectToLogin}
              className="hover:text-green-500 text-green-700 underline"> here </button> to login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logout;
