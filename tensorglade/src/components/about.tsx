'use client'
import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the wave background to avoid SSR issues with Three.js
const ThreeWaveBackground = dynamic(() => import('../atoms/ThreeWaveBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gray-900" />
  )
})

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Initialize intersection observer for additional scroll effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          } else {
            // Optional: Remove the class when no longer in view
            // entry.target.classList.remove('in-view')
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    )

    // Observe content elements
    const contentElements = document.querySelectorAll('.scroll-animate')
    contentElements.forEach((el) => observer.observe(el))

    return () => {
      contentElements.forEach((el) => observer.unobserve(el))
    }
  }, [])
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full text-center text-primarytext items-center mb-12 py-16 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* The Three.js wave background */}
      <ThreeWaveBackground />
      
      {/* Content with increased contrast for better visibility over the background */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="scroll-animate opacity-0 transition-all duration-1000 ease-out transform translate-y-10">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Innovate with Intelligence
          </h2>
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            AI Solutions for Limitless
          </h2>
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Growth
          </h2>
        </div>
        
        <div className="scroll-animate opacity-0 transition-all duration-1000 ease-out transform translate-y-10 delay-300">
          <p className="text-lg md:text-2xl mt-8 px-6 md:px-16 max-w-3xl mx-auto text-center shadow-text">
            We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into an AI-Powered MVP today.
          </p>
        </div>

        <div className="scroll-animate opacity-0 transition-all duration-1000 ease-out transform translate-y-10 delay-500 mt-12">
          <div className="flex flex-col items-center">
            <iframe
              className="w-full md:w-[800px] h-[300px] md:h-[450px] rounded-2xl shadow-xl bg-black/20 backdrop-blur-sm"
              src="https://www.youtube.com/embed/ZVnjOPwW4ZA?si=otfGybLpKqLl_P1x"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;