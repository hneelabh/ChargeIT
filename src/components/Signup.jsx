import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase.js"; //we will use this variable to make the authentication state changed while signing from google.
import { useFormik } from "formik";
//we will use formik to make sure that form handling becomes easier and more streamlined.
import { signUpSchema } from "../Schemas"; //this is the validation we did using the yup library.
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

  //We check if the user is logged in and not currrently in the loading state.
  if (user && !loading) {
    // If the user is logged in then there is no need for the signup page so we redirect the user to the login page.
    navigate("/login");
    return null; // We return null to prevent the signup form from rendering again.
  }
  return (
    <>
      <h1>Welcome !</h1>
      <h3>Sign Up</h3>
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
              onBlur={handleBlur} //This will make sure to render when the cursor is outside the input field.
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
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              autoComplete="off"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              {errors.confirm_password && touched.confirm_password ? (
                <p>{errors.confirm_password}</p>
              ) : null}
            </div>
          </div>
          <div>
            <button type="submit">Registration</button>
            <GoogleSignInButton />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
