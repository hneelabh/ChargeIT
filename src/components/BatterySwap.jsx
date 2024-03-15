import React from "react";
import bgImage from "../bg.jpg";
import { useNavigate } from "react-router-dom";


const BatterySwap = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="container mx-auto">
      <h1 
        data-aos="fade-left"
        className="text-6xl font-bold text-center mb-10 text-green-100 mt-8">
          Battery Swap
      </h1>

      <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="false"
            className="order-1 sm:order-2"
      >
      <div className="bg-white p-6 rounded shadow-md mb-8 md:mb-0 opacity-70">

          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <p className="text-lg">
            Thank you for choosing <span className="font-serif font-semibold"> Charge IT</span> for your electric vehicle battery needs. Our battery swap service is designed to provide you with a quick and convenient way to keep your electric vehicle on the road. Please follow these general instructions for a smooth battery swap experience:
            <br />
            <dl className="list-disc pl-4">
              <dt className="font-semibold mt-4">i. Locate a <span className="font-serif">Charge IT</span> Swap Station:</dt>
              <dd>Use the <span className="font-serif"> Charge IT</span> website to find the nearest Swap Station. Drive to the designated <span className="font-serif"> Charge IT</span> Swap Station location.</dd>
              <dt className="font-semibold mt-4">ii. Park in the Designated Area:</dt>
              <dd>Once at the Swap Station, park your electric vehicle in the designated area.</dd>
              <dt className="font-semibold mt-4">iii. Authentication:</dt>
              <dd>Authenticate the battery swap process using the <span className="font-serif"> Charge IT</span> app or any provided authentication method.</dd>
              <dt className="font-semibold mt-4">iv. Follow On-Screen Instructions:</dt>
              <dd>The Swap Station will guide you through the process with on-screen instructions. Ensure your vehicle is in park and turn off the ignition.</dd>
              <dt className="font-semibold mt-4">v. Open Charging Port:</dt>
              <dd>Open the charging port on your electric vehicle as directed by the on-screen instructions.</dd>
              <dt className="font-semibold mt-4">vi. Wait for Battery Swap:</dt>
              <dd>Remain in your vehicle as the automated system performs the battery swap. The process typically takes a few minutes.</dd>
              <dt className="font-semibold mt-4">vii. Payment and Confirmation:</dt>
              <dd>Confirm the battery swap details on the screen. Complete the payment process through the <span className="font-serif"> Charge IT</span> app or payment terminal.</dd>
              <dt className="font-semibold mt-4">viii. Close Charging Port:</dt>
              <dd>Close the charging port on your electric vehicle.</dd>
              <dt className="font-semibold mt-4">ix. Resume Your Journey:</dt>
              <dd>Once the battery swap is complete and payment is confirmed, you're ready to continue your journey with a fully charged battery.</dd>
            </dl>
          </p>
        </div>

        <div className="md:flex md:justify-center md:space-x-8">
          <div className="bg-white p-6 mt-10 opacity-70 rounded shadow-md md:flex-grow mb-12">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <p className="text-lg">
              <dl className="list-disc pl-4">
                <dt className="font-semibold mt-4">• Intuitive App Experience: </dt>
                <dd>Charge IT offers a user-friendly interface, allowing EV owners to easily locate, navigate to, and use the battery swap stations effortlessly.</dd>
                <dt className="font-semibold mt-4">• Emergency Shutdown Features: </dt>
                <dd>Charge IT prioritizes safety with features like emergency shutdown options and automated safety checks at its battery swap stations, ensuring a secure and reliable charging experience.</dd>
                <dt className="font-semibold mt-4">• Environmental Impact Tracking:</dt>
                <dd>Information on the environmental impact of charging sessions, including carbon footprint reduction and energy source transparency.</dd>
                <dt className="font-semibold mt-4">• Authentication and Payment Integration:</dt>
                <dd>Secure authentication methods for users, integrated with various payment options for a hassle-free battery-swap experience.</dd>
                <dt className="font-semibold mt-4">• Energy Storage Solutions: </dt>
                <dd>Incorporates energy storage solutions such as renewable energy sources or grid-connected systems to provide sustainable power for charging and swapping operations.</dd>
              </dl>
            </p>
          </div>

          <div className="bg-white p-6 mt-10 opacity-70 rounded shadow-md md:flex-grow mb-12">
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <p className=" text-lg">
              <dl className="list-disc pl-4">
                <dt className="font-semibold mt-4">• Quick and Efficient Battery Swaps:</dt>
                <dd>Charge IT's battery swap service offers a rapid solution, minimizing the time spent at charging stations and allowing users to quickly get back on the road with a fully charged battery.</dd>
                <dt className="font-semibold mt-4">• Comprehensive EV Solution:</dt>
                <dd>Charge IT's battery swap service complements traditional charging infrastructure, providing a comprehensive solution to meet the diverse needs of EV users.</dd>
                <dt className="font-semibold mt-4">• Universal Compatibility: </dt>
                <dd>Charge IT's battery swap service is designed to seamlessly integrate with a wide range of electric vehicle models, ensuring compatibility and convenience for EV owners with different makes and models.</dd>
                <dt className="font-semibold mt-4">• Convenience in Route Planning:</dt>
                <dd>Users can rely on the Charge IT app for real-time information on the availability of battery swap stations, enabling effective route planning and reducing wait times.</dd>
                <dt className="font-semibold mt-4">• Reduced Range Anxiety:</dt>
                <dd>The quick and efficient battery swaps provided by Charge IT contribute to reducing range anxiety among EV owners, enabling them to confidently plan longer journeys.</dd>
              </dl>
            </p>
          </div>

        </div>
        </div>
      </div>
      <div className="absolute bottom-0 mb-4">
        <button onClick={redirectToHome} className="text-green-200 underline rounded">
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default BatterySwap;
