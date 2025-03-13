// import React from "react";
// import HARSH from '../images/harsh.jpeg'
// import MALAY from '../images/malay.jpeg'
// import MOHIT from '../images/mohit.jpeg'

// const testimonialData = [
//   {
//     name: "Malay Ghoshal",
//     image: `${MALAY}`,
//     description:
//       "The driving force behind in-depth research, market analysis, and seamless client engagement. Malay’s strategic insights laid the foundation for the project’s success.",
//     aosDelay: "0",
//   },
//   {
//     name: "Harsh Neelabh",
//     image: `${HARSH}`,
//     description:
//       "Lead Developer and Designer responsible for crafting an intuitive and visually compelling front-end experience. Harsh blended creativity with technical expertise to bring the project to life.",
//     aosDelay: "300",
//   },
//   {
//     name: "Mohit Kumar",
//     image: `${MOHIT}`,
//     description:
//       "Lead Backend Developer who engineered a robust and scalable backend architecture. Mohit ensured smooth data flow and system reliability throughout the project.",
//     aosDelay: "500",
//   },
// ];

// const Testimonial = () => {
//   return (
//     <div className="dark:bg-black bg-white dark:text-white sm:min-h-[600px] h-screen sm:grid sm:place-items-center duration-300">
//       <div name="testimonials" className="dark:bg-black dark:text-white py-14 sm:pb-24">
//         <div className="container space-y-4 pb-12">
//             <p
//               data-aos="fade-up"
//               className="text-3xl font-semibold text-center sm:text-4xl font-serif"
//             >
//               Meet the Team
//             </p>
//             <p data-aos="fade-up" className="text-center sm:px-44">
//             The people involved this project, from brianstorming the ideas to developing and bringing them to life.</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
//             {testimonialData.map((skill) => (
//               <div
//                 key={skill.name}
//                 data-aos="fade-up"
//                 data-aos-delay={skill.aosDelay}
//                 className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-dark bg-primary duration-300  rounded-lg "
//               >
//                 <div className="grid place-items-center ">
//                   <img
//                     src={skill.image}
//                     alt=""
//                     className="rounded-full w-20 h-20"
//                   />
//                 </div>
//                 <p className="text-center font-semibold">{skill.name}</p>
//                 <p>{skill.description}</p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;

import React from "react";
import HARSH from '../images/harsh.jpeg';
import MALAY from '../images/malay.jpeg';
import MOHIT from '../images/mohit.jpeg';

const testimonialData = [
  {
    name: "Malay Ghoshal",
    image: MALAY,
    description:
      "The driving force behind in-depth research, market analysis, and seamless client engagement. Malay’s strategic insights laid the foundation for the project’s success.",
    aosDelay: "0",
    linkedin: "https://www.linkedin.com/in/malay-ghoshal-7b7102228",
  },
  {
    name: "Harsh Neelabh",
    image: HARSH,
    description:
      "Lead Developer and Designer responsible for crafting an intuitive and visually compelling front-end experience. Harsh blended creativity with technical expertise to bring the project to life.",
    aosDelay: "300",
    linkedin: "https://www.linkedin.com/in/hneelabh",
  },
  {
    name: "Mohit Kumar",
    image: MOHIT,
    description:
      "Lead Backend Developer who engineered a robust and scalable backend architecture. Mohit ensured smooth data flow and system reliability throughout the project.",
    aosDelay: "500",
    linkedin: "https://www.linkedin.com/in/mohit-kumar-b77b69281/",
  },
];

const Testimonial = () => {
  return (
    <div className="dark:bg-black bg-white dark:text-white h-screen flex items-center justify-center duration-300">
      <div name="testimonials" className="w-full py-14 sm:pb-24">
        <div className="container mx-auto space-y-4 pb-12 px-4">
          <p
            data-aos="fade-up"
            className="text-3xl font-semibold text-center sm:text-4xl font-serif"
          >
            Meet the Team
          </p>
          <p
            data-aos="fade-up"
            className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          >
            The people behind this project, from brainstorming ideas to developing and bringing them to life.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonialData.map((member) => (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                key={member.name}
                data-aos="fade-up"
                data-aos-delay={member.aosDelay}
                className="card text-center group space-y-4 p-6 sm:py-12 dark:bg-dark bg-primary hover:scale-105 transition duration-300 rounded-lg shadow-lg cursor-pointer"
              >
                <div className="flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-24 h-24 object-cover border-4 border-white dark:border-gray-800 shadow-md"
                  />
                </div>
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 px-2">{member.description}</p>
                <p className="text-blue-500 hover:underline">View LinkedIn</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
