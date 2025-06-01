'use client';
import { Link } from "react-scroll";
import LinkNav from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
      <nav
        className={`w-full transition-all duration-300 lg:h-24 md:h-20 h-16 flex justify-between items-center lg:px-16 md:px-9 px-6
                  ${scrolled
            ? 'bg-transparent backdrop-blur-md shadow-sm'
            : 'bg-transparent'}`}
      >
        <LinkNav href="/" className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 hover:text-orange-600 transition-colors">
          TensorGlade
        </LinkNav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow-sm border border-gray-200/20 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-800 my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {["about", "services", "projects", "contact"].map((section) => (
            <li key={section}>
              <Link
                to={section}
                smooth={true}
                duration={500}
                className="cursor-pointer text-primarytext hover:text-orange-500 transition-all duration-300 text-base md:text-lg relative before:w-0 before:h-0.5 before:bg-orange-500 before:absolute before:-bottom-2 before:left-0 before:transition-all before:duration-200 hover:before:w-full"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile navigation overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-500 ease-out md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile navigation slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] max-w-sm bg-transparent backdrop-blur-md shadow-xl overflow-y-auto transition-transform duration-500 ease-out transform z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300/20">
          <span className="text-xl font-bold text-orange-500">Menu</span>
          <button 
            className="p-2 rounded-full hover:bg-white/10"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <ul className="py-4">
          {["about", "services", "projects", "contact"].map((section) => (
            <li key={section} className="border-b border-gray-300/10 last:border-b-0">
              <Link
                to={section}
                smooth={true}
                duration={500}
                className="block py-3 px-6 text-white hover:bg-white/10 hover:text-orange-500 transition-all duration-300 text-lg"
                onClick={handleLinkClick}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;