// import React from "react";
// import { FaCar } from "react-icons/fa";
// import { GiBattery75 } from "react-icons/gi";
// import { GiCharging } from "react-icons/gi";
// import { Link as RouterLink } from 'react-router-dom';

// const skillsData = [
//   {
//     name: "Book a Slot",
//     icon: <GiCharging className="text-5xl" />,
//     link: "/booking",
//     description: "Running out of energy? Book a slot of your choice at any charging station.",
//     aosDelay: "0",
//   },
//   {
//     name: "Swap Batteries",
//     icon: <GiBattery75 className="text-5xl" />,
//     link: "/batteryswap",
//     description: "Out of batteries? Get them hand to hand by depositing your empty battery at the station.",
//     aosDelay: "500",
//   },
//   {
//     name: "Rent an EV",
//     icon: <FaCar className="text-5xl " />,
//     link: "/vehicle",
//     description: "Want a thrilling experience of an EV? You may book EVs as per your demand and requirements.",
//     aosDelay: "1000",
//   },
// ];

// const Services = ({ theme }) => {
//   return (
//     <>
//       <span name="booking" id="about"></span>
//       <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
//         <div className="container">
//           <div className="pb-12">
//             <h1
//               data-aos="fade-up"
//               className="text-3xl font-semibold text-center sm:text-4xl font-serif"
//             >
//               What would you like to do?
//             </h1>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
//             {skillsData.map((skill) => (
//                 <RouterLink to={skill.link}>
//                 <button className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-primary dark:bg-dark dark:hover:bg-primary hover:bg-dark duration-300 text-black dark:text-white hover:text-white dark:hover:text-black rounded-lg"></button>
//                 href={skill.link}
//                 data-aos="fade-up"
//                 data-aos-delay={skill.aosDelay}
//               </RouterLink>

//                 <div className="grid place-items-center">{skill.icon}</div>
//                 <h1 className="text-2xl font-bold">{skill.name}</h1>
//                 <p>{skill.description}</p>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Services;

import React from "react";
import { FaCar } from "react-icons/fa";
import { GiBattery75, GiCharging } from "react-icons/gi";
import { Link as RouterLink } from 'react-router-dom';

const skillsData = [
  {
    name: "Book a Slot",
    icon: <GiCharging className="text-5xl" />,
    link: "/booking",
    description: "Running out of energy? Book a slot of your choice at any charging station.",
    aosDelay: "0",
  },
  {
    name: "Swap Batteries",
    icon: <GiBattery75 className="text-5xl" />,
    link: "/batteryswap",
    description: "Out of batteries? Get them hand to hand by depositing your empty battery at the station.",
    aosDelay: "500",
  },
  {
    name: "Rent an EV",
    icon: <FaCar className="text-5xl " />,
    link: "/vehicle",
    description: "Want a thrilling experience of an EV? You may book EVs as per your demand and requirements.",
    aosDelay: "1000",
  },
];

const Services = ({ theme }) => {
  return (
    <>
      <span name="booking" id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What would you like to do?
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <RouterLink to={skill.link} key={skill.name}>
                <button className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-primary dark:bg-dark dark:hover:bg-primary hover:bg-dark duration-300 text-black dark:text-white hover:text-white dark:hover:text-black rounded-lg" data-aos="fade-up" data-aos-delay={skill.aosDelay}>
                  <div className="grid place-items-center">{skill.icon}</div>
                  <h1 className="text-2xl font-bold">{skill.name}</h1>
                  <p>{skill.description}</p>
                </button>
              </RouterLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

