import React, { useEffect, useState } from "react";
import BlackCarPng from "../car_black.jpg"
import WhiteCarPng from "../car_white.webp"
import AOS from "aos";
import { Link } from 'react-scroll';
import Logo from "../logo.png"

const Hero = ({ theme }) => {
  return (
    <div name="home" className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? BlackCarPng : WhiteCarPng}
              alt=""
              className="sm:scale-125 xs:scale-75 relative -z-10 max-h-[600px]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-green-600 text-2xl font-serif">
              Go Green With
            </p>

            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl flex lg:text-7xl font-semibold font-serif"
            >
              Charge IT
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000" className="text-lg">
            Electrify your ride, swap for green miles, and reserve your power spot at 
            <span className="font-serif font-semibold"> Charge IT</span>
            , where convenience meets eco-consciousness!{" "}
            </p>
            <Link 
            data-aos="fade-up"
            data-aos-delay="600"
            className='inline-block py-2 px-6 rounded-full cursor-pointer dark:bg-dark bg-primary hover:bg-green-600 dark:hover:bg-green-600 dark:text-white transition-colors-duration-500' to="booking" smooth={true} duration={500}> Get Started </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
