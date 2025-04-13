"use client"; // For smooth scrolling in Next.js 13+

import { Link } from "react-scroll";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                 ${scrolled 
                   ? 'bg-white/10 backdrop-blur-md shadow-sm' 
                   : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-hoverprimary">TensorGlade</h1>
        
        <button
          className="md:hidden p-2 rounded bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ul className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} md:block`}>
          {["about", "services", "projects", "contact"].map((section) => (
            <li key={section}>
              <Link
                to={section}
                smooth={true}
                duration={500}
                className="cursor-pointer text-primarytext hover:text-hoverprimary transition-all duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;