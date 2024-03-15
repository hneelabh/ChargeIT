import React from 'react';
import Location from "../images/vector-location-icon.jpg"
import Park from "../images/parking.png"
import Auth from "../images/authentication-symbol.jpg"
import Battery from "../images/Battery swap.jpg"
import Port from "../images/charging port.jpg"
import Resume from "../images/resume journy.jpg"
import Payment from "../images/payment mode.jpg"
import Screen from "../images/screen.jpeg"

function BatteryInst() {
  return (
    <div name="instructions">
    <div className="antialiased bg-black text-gray-800 pb-16 pt-8"> {/* Added pt-8 for top padding */}
      <div className="container mx-auto px-6 flex flex-col space-y-8">
        <h1 className='text-center font-bold mb-8 text-5xl underline text-yellow-500'>Instructions for Battery Swap</h1>
      <div className="relative container mx-auto px-6 flex flex-col space-y-8">
        <div className="absolute z-0 w-2 h-full bg-yellow-200 shadow-md inset-0 left-17 md:mx-auto md:right-0 md:left-0"></div>

        <div className="relative z-10">
          <img src={Location} alt="" className="timeline-img" />
          <div className="timeline-container">
            <div className="timeline-pointer" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-left" data-aos-duration="800" data-aos-once="false">
                <div className='font-bold'>1. Locate a <span className="font-serif">Charge IT</span> Swap Station:</div>
                Use the <span className="font-serif"> Charge IT</span> website to find the nearest Swap Station. Drive to the designated <span className="font-serif"> Charge IT</span> Swap Station location.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Park} alt="" className="timeline-img" />
          <div className="timeline-container timeline-container-left">
            <div className="timeline-pointer timeline-pointer-left" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-right" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>2. Park in the Designated Area:</div>
            Once at the Swap Station, park your electric vehicle in the designated area.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Auth} alt="" className="timeline-img" />
          <div className="timeline-container">
            <div className="timeline-pointer" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-left" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>3. Authentication:</div>
            Authenticate the battery swap process using the <span className="font-serif"> Charge IT</span> app or any provided authentication method.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Screen} alt="" className="timeline-img" />
          <div className="timeline-container timeline-container-left">
            <div className="timeline-pointer timeline-pointer-left" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-right" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>4. Follow On-Screen Instructions:</div>
            The Swap Station will guide you through the process with on-screen instructions. Ensure your vehicle is in park and turn off the ignition.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Port} alt="" className="timeline-img" />
          <div className="timeline-container">
            <div className="timeline-pointer" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-left" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>5. Open Charging Port:</div>
            Open the charging port on your electric vehicle as directed by the on-screen instructions.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Battery} alt="" className="timeline-img" />
          <div className="timeline-container timeline-container-left">
            <div className="timeline-pointer timeline-pointer-left" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-right" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>6. Wait for Battery Swap:</div>
            Remain in your vehicle as the automated system performs the battery swap. The process typically takes a few minutes.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Payment} alt="" className="timeline-img" />
          <div className="timeline-container">
            <div className="timeline-pointer" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-left" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>7. Payment and Confirmation:</div>
            Confirm the battery swap details on the screen. Complete the payment process through the <span className="font-serif"> Charge IT</span> app or payment terminal.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Port} alt="" className="timeline-img" />
          <div className="timeline-container timeline-container-left">
            <div className="timeline-pointer timeline-pointer-left" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-right" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>8. Close Charging Port:</div>
            Close the charging port on your electric vehicle.
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <img src={Resume} alt="" className="timeline-img" />
          <div className="timeline-container">
            <div className="timeline-pointer" aria-hidden="true"></div>
            <div className="bg-yellow-200 p-6 rounded-md shadow-md"
            data-aos="fade-left" data-aos-duration="800" data-aos-once="false">
            <div className='font-bold'>9. Resume Your Journey:</div>
            Once the battery swap is complete and payment is confirmed, you're ready to continue your journey with a fully charged battery.
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default BatteryInst;
