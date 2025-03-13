import React, { useState } from 'react';
import { BiSolidSun, BiSolidMoon } from 'react-icons/bi';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from "../logo.png"


const Navbar = ({ theme, setTheme }) => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);
  const closeMobileMenu = () => setNav(false);

  return (
    <nav className='fixed w-full h-[70px] flex justify-between items-center px-4 bg-primary dark:bg-dark dark:text-white z-50'>
      <div className='container md:py-0'>
        <div className='flex justify-between items-center'>
          {/* Setting the components for navbar */}

          <span>
          <RouterLink to="/" onClick={closeMobileMenu}>
                
                  <button className='py-2 hover:border-b-2 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 hover:cursor-pointer text-lg font-medium flex'><img src={Logo} alt="logo" style={{width: '40px'}} /><h1 className='text-3xl ml-2 font-bold font-serif'>Charge IT</h1></button>
                </RouterLink>
          </span>

          <div className="hidden md:flex gap-4 ml-auto items-center">
            <ul className='flex items-center gap-6 py-4'>
              <li>
                <RouterLink to="/services" onClick={closeMobileMenu}>
                  <button className='inline-block py-2 hover:border-b-2 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 hover:cursor-pointer text-lg font-medium'>SERVICES</button>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" onClick={closeMobileMenu}>
                  <button className='inline-block py-2 hover:border-b-2 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 hover:cursor-pointer text-lg font-medium'>ABOUT</button>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/team" onClick={closeMobileMenu}>
                  <button className='inline-block py-2 hover:border-b-2 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 hover:cursor-pointer text-lg font-medium'>THE TEAM</button>
                </RouterLink>
              </li>

              <li>
                <RouterLink to="/logout" onClick={closeMobileMenu}>
                  <button className='inline-block py-2 hover:border-b-2 hover:text-green-700 hover:border-green-700 transition-colors-duration-500 hover:cursor-pointer text-lg font-medium'>ACCOUNT</button>
                </RouterLink>
              </li>
            </ul>
          </div>
                
          {/* Hamburger Button for mobile menu*/}
          <div className='md:hidden z-10 ml-auto'>
            {!nav ? <FaBars aria-expanded="false" onClick={handleClick} /> : <FaTimes aria-expanded="true" onClick={handleClick} />}
          </div>

          {/* Changing the theme */}
          <div className="flex items-center gap-2 hover:cursor-pointer ml-5">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className='text-2xl' />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className='text-2xl' />
            )}
          </div>
          
        </div>
      </div>

      {/* Mobile Menu onlick Hamburger*/}
      <div className={`md:hidden ${nav ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}`}>
        <div className="bg-gray-300 dark:bg-gray-800 rounded-lg p-4 transform scale-90">
          <ul className='flex flex-col items-center gap-4'>
            <li>
              <Link onClick={closeMobileMenu} to="booking" smooth={true} duration={500}> Services </Link>
            </li>
            <li>
              <Link onClick={closeMobileMenu} to="about" smooth={true} duration={500}> About Us </Link>
            </li>
            <li>
              <Link onClick={closeMobileMenu} to="testimonials" smooth={true} duration={500}> The Team </Link>
            </li>
            <li>
              <RouterLink to="/login" onClick={closeMobileMenu}> Login </RouterLink>
            </li>
            <li>
              <RouterLink to="/logout" onClick={closeMobileMenu}> Account </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;