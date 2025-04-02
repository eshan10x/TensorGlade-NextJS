'use client'
import Image from "next/image";
import React from 'react'
import dynamic from 'next/dynamic'

const About = () => {

  const WaveAnimation = dynamic(() => import('../atoms/WaveAnimation'), {
    ssr: false,
    loading: () => (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        borderRadius: '8px'
      }}>
        Loading Wave Animation...
      </div>
    )
  })

  return (
    <section id="about" className="w-full text-center text-primarytext items-center mb-12 mt-6">
      <h2 className="text-4xl md:text-7xl font-bold leading-tight">
        Innovate with Intelligence
      </h2>
      <h2 className="text-4xl md:text-7xl font-bold leading-tight">
        AI Solutions for Limitless
      </h2>
      <h2 className="text-4xl md:text-7xl font-bold leading-tight">
        Growth
      </h2>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Wave Animation Demo</h1>
        <div className="wave-container">
          <WaveAnimation/>
        </div>
      </div>

      {/* <p className="text-lg md:text-2xl mt-6 px-4 md:px-28">
        We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into AI-Powered MVP today
      </p> */}
      <p className="text-lg md:text-2xl mt-6 px-6 md:px-16 max-w-3xl mx-auto text-center">
        We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into an AI-Powered MVP today.
      </p>

      <div className="flex flex-col items-center mt-6">
        <iframe
          className="w-full md:w-[800px] h-[300px] md:h-[450px] rounded-2xl shadow-lg"
          src="https://www.youtube.com/embed/ZVnjOPwW4ZA?si=otfGybLpKqLl_P1x"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default About;
