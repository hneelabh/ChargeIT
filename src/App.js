import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import AOS from 'aos';
import 'aos/dist/aos.css';

//components
import Navbar from './components/Navbar';
import Login from './components/Login'; 
import Logout from './components/Logout';
import Signup from './components/Signup';
import Hero from './components/Hero'
import Services from './components/Services';

const App = () => {
    // setting dark theme
    const [theme, setTheme] = useState(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    const element = document.documentElement;
  
    useEffect(() => {
      if (theme === "dark") {
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [theme]);
  
    //AOS Init
    useEffect(() => {
      AOS.init({
        offest: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
  
    return (
      <Router>
        <div>
  
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<>
              <Navbar theme={theme} setTheme={setTheme} />
              <Hero theme={theme} />
              <hr></hr>
              <Services theme={theme} />
            </>} />
          </Routes>
  
        </div>
      </Router>
    );
  };
  
  export default App;