import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useFormik } from "formik";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <>
      <h1>Welcome!</h1>
      <h3>This is a simple login form</h3>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
            </div>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
