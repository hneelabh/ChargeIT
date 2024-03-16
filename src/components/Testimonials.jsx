import React from "react";

const testimonialData = [
  {
    name: "Matt Issac",
    image: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
    description: "Charge IT's Booking slots is effortless, and their battery swap service keeps us running smoothly.",
    aosDelay: "0",
  },
  {
    name: "Ryan Evans",
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
    description: "Charge IT's innovation shines through. Predictive maintenance alerts and a startup mindset set them apart.",
    aosDelay: "300",
  },
  {
    name: "Chad Mackie",
    image: "https://xsgames.co/randomusers/assets/avatars/male/62.jpg",
    description: "Charge IT values collaboration. They listen, adapt quickly, and prioritize customer satisfaction.",
    aosDelay: "500",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div name="testimonials" className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
            Discover what our clients have to say about Charge IT, the small startup making big waves with innovative EV solutions:            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-dark bg-primary duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={skill.image}
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;