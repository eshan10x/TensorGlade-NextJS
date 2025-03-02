"use client"; // For smooth scrolling in Next.js 13+

import { Link } from "react-scroll";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl text-primarytext font-bold">TensorGlade</h1>
        
        <button
          className="md:hidden p-2 rounded bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ul className={`md:flex space-x-6 text-primarytext hover:bg-[#383838] dark:hover:bg-[#ccc] ${isOpen ? "block" : "hidden"} md:block`}>
          <li><Link to="hero" smooth={true} duration={500} className="cursor-pointer">Home</Link></li>
          <li><Link to="about" smooth={true} duration={500} className="cursor-pointer">About Us</Link></li>
          <li><Link to="services" smooth={true} duration={500} className="cursor-pointer">Services</Link></li>
          <li><Link to="portfolio" smooth={true} duration={500} className="cursor-pointer">Projects</Link></li>
          <li><Link to="contact" smooth={true} duration={500} className="cursor-pointer">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
