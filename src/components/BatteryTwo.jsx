import React from 'react'
import "aos/dist/aos.css";

const BatteryTwo = () => {
  return (
    <div name="BatteryTwo">
    <div className='text-white bg-black'>
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
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BatteryTwo