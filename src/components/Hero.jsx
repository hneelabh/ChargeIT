import React from "react";
import BlackCarPng from "../images/car_black.jpg";
import WhiteCarPng from "../images/car_white.webp";
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Hero = ({ theme }) => {
  return (
    <div
      name="home"
      className="dark:bg-black dark:text-white duration-300 h-screen flex items-center justify-center"
    >
      <div className="container flex items-center justify-center h-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center w-full">
          {/* Image Section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2 flex justify-center"
          >
            <img
              src={theme === "dark" ? BlackCarPng : WhiteCarPng}
              alt="Car"
              className="sm:scale-125 dark:scale-100 xs:scale-75 relative -z-10 max-h-[600px]"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 text-center sm:text-left">
            <p
              data-aos="fade-up"
              className="text-green-600 text-xl font-serif"
            >
              Go Green With
            </p>

            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl lg:text-7xl font-semibold font-serif"
            >
              Charge IT
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-lg"
            >
              Stay in charge. Plan your day, and
              <span className="font-serif font-semibold"> Charge IT </span>
              your way!
            </p>

            <RouterLink to="/booking"
              data-aos="fade-up"
              data-aos-delay="1600"
              className="inline-block py-2 px-6 rounded-full cursor-pointer dark:bg-dark bg-primary hover:bg-green-600 dark:hover:bg-green-600 dark:text-white transition-colors duration-500"
              smooth={true}
              duration={500}
            >
              Book a Slot
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
