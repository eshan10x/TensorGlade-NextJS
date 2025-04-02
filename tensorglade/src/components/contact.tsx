"use client";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus({ message: "Please enter a valid email address", isError: true });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ message: "", isError: false });
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ message: "Thank you! We'll contact you soon.", isError: false });
        setEmail("");
      } else {
        setStatus({ message: data.message || "Something went wrong. Please try again.", isError: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ message: "Connection error. Please try again later.", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-white w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center gap-10 md:gap-20 text-center md:text-left">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black w-full max-w-lg text-wrap">
          Contact Us <br className="hidden md:inline" />
          Will reply back you soon..
        </h2>

        {/* Input and Subscribe Button */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="relative">
            <input
              type="email"
              placeholder="yourName@company.com*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-5 pr-24 text-gray-600 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-orange-600 disabled:bg-orange-300"
            >
              {isSubmitting ? "Sending..." : "Contact Us"}
            </button>
          </div>
          
          {status.message && (
            <p className={`mt-2 text-sm ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;