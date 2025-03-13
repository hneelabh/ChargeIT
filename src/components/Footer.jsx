import React from "react";
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = ({ theme }) => {
  return (
    <div className="bg-primary dark:bg-gray-950 dark:text-white text-black">
      <section className="container">
        <div className="grid md:grid-cols-3 py-5">
          <div className="py-8 px-4 md:px-8">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
              Charge IT
            </h1>
            <p className="text-sm">
            Stay in charge. Plan your day, and Charge IT your way!{" "}
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Kochi, Kerala</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+91 9506010601</p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.instagram.com/">
                <FaInstagram className="text-3xl hover:text-green-500 duration-300" />
              </a>
              <a href="https://www.facebook.com">
                <FaFacebook className="text-3xl hover:text-green-500 duration-300" />
              </a>
              <a href="https://www.linkedin.com/chargeit">
                <FaLinkedin className="text-3xl hover:text-green-500 duration-300" />
              </a>
            </div>
          </div>

          <div className="py-8 px-4 md:px-8 mx-12 col-span-2">
            <h1 className="sm:text-xl text-xl font-bold text-center sm:text-left mb-3">
              Important Links
            </h1>
            <ul className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              <li>
                <Link className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small" to="home" smooth={true} duration={500}> Home </Link>
              </li>
              <li>
                <Link className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small" to="booking" smooth={true} duration={500}> Services </Link>
              </li>
              <li>
                <Link className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small" to="testimonials" smooth={true} duration={500}> Testimonials </Link>
              </li>
              <li>
                <Link className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small" to="about" smooth={true} duration={500}> About </Link>
              </li>
              <li>
                <RouterLink to="/logout">
                  <button className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small">Account</button>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/booking">
                  <button className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small">Book a Slot</button>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/BatterySwap">
                  <button className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small">Swap Batteries</button>
                </RouterLink>
              </li>
              <li>
              <Link 
                  className="inline-block py-1 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 text-lg font-small" to="home" smooth={true} duration={500}>Back to Top
              </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;