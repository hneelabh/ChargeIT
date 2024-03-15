import React from "react";
import BatterySwapImg from "../battery-swap.jpg";
import BatteryInst from "./BatteryInst";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Battery = () => {
  const navigate = useNavigate();
  const redirectToInstructions = () => {
    navigate("/BatterySwap");
  };

  return (
    <div className="bg-black text-white">
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
          </div>
        </div>
      </div>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
          <h3
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-3xl lg:text-4xl text-yellow-500 font-semibold mb-8"
          >
            Why Battery Swapping?
          </h3>
          <ul className="list-disc pl-5">
            <li
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-lg lg:text-xl mb-5"
            >
              <span className="text-yellow-500">Instant Power Boost:</span> Say goodbye to range anxiety! With battery swapping, you can exchange your depleted battery for a fully charged one in minutes, giving you the confidence to embark on longer journeys without any interruptions.
            </li>
            <li
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-lg lg:text-xl mb-5"
            >
              <span className="text-yellow-500">Time Efficiency:</span> Time is precious, and waiting hours for your EV to recharge is a thing of the past. Battery swapping stations are designed for efficiency, ensuring you're back on the road in no time.
            </li>
            <li
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-lg lg:text-xl mb-5"
            >
              <span className="text-yellow-500">Accessibility:</span> Whether you're a city dweller or an adventurer exploring remote areas, battery swapping stations provide accessible charging solutions where traditional charging infrastructure may be limited.
            </li>
            <li
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-lg lg:text-xl mb-5"
            >
              <span className="text-yellow-500">Enhanced Sustainability:</span> By streamlining the charging process, battery swapping reduces the strain on the power grid and promotes renewable energy integration, making your EV experience even more eco-friendly.
            </li>
            <li
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-lg lg:text-xl mb-5"
            >
              <span className="text-yellow-500">Cost-Effective: </span> Forget about investing in expensive home charging units or paying hefty fees for fast charging. Battery swapping offers a cost-effective alternative, allowing you to pay for the energy you use without any additional maintenance costs.
            </li>
          {/* <button
            onClick={redirectToInstructions}
            className="text-yellow-600 mb-8 underline rounded focus:outline-none"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            Learn more about the process
          </button> */}
          </ul>

        </div>

      </div>
      <BatteryInst/>
    </div>
  );
};

export default Battery;

