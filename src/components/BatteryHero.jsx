import React from "react";
import BatterySwapImg from "../battery-swap.jpg";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const BatteryHero = () => {
  return (
    <div name="BatteryHero">
    <div className="text-white bg-black">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
          <div className="order-1 sm:order-2"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-once="false"
          >
            <img
              src={BatterySwapImg}
              alt=""
              className="w-full md:max-h-[600px] md:scale-125"
            />
          </div>
          <div className="order-2 md:order-1 md:pr-8 lg:pr-16 xl:pr-24">
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl sm:mt-5 lg:text-5xl text-green-100 font-semibold font-serif"
            >
              Team Charge IT
            </h1>
            <h2
              data-aos="fade-up"
              data-aos-delay="800"
              className="text-xl sm:mt-5 mt-8 text-gray-400 lg:text-2xl font-semibold"
            >
              proudly presents
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-4xl text-yellow-500 lg:text-7xl font-bold sm:mt-5 mt-8"
            >
              Battery Swapping Feature!
            </p>
            <Link 
            data-aos="fade-up"
            data-aos-delay="600"
            className='inline-block py-2 px-6 rounded-full mt-8 text-black cursor-pointer bg-yellow-500 hover:bg-yellow-700 transition-colors-duration-500' to="/bookBattery" smooth={true} duration={500}> Emergency Battery Request 
          </Link>
          </div>


        </div>
      </div>
    </div>
    </div>
  );
};

export default BatteryHero;

