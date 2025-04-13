'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import VideoContainer from "@/atoms/videocontainer";

const ThreeWaveBackground = dynamic(() => import('../atoms/ThreeWaveBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 overflow-hidden" />
  )
})

const About = () => {

  return (
    <section id="about" className="w-full text-center text-primarytext items-center mb-12 mt-6">
      <div className="absolute inset-0 -top-16 z-0 overflow-hidden">
        <ThreeWaveBackground />
      </div>
      <div className="relative w-full text-center text-primarytext items-center mb-12 py-16 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
            Innovate with Intelligence
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            AI Solutions for Limitless
          </h2>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Growth
          </h2>
        </div>


        {/* <p className="text-lg md:text-2xl mt-6 px-4 md:px-28">
        We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into AI-Powered MVP today
      </p> */}
        <p className="text-lg md:text-2xl mt-6 px-6 md:px-16 max-w-5xl mx-auto text-center">
          We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into an AI-Powered MVP today.
        </p>

        <div className="max-w-6xl scroll-animate opacity-100 transition-all duration-1000 ease-out delay-500 mt-12">
          <VideoContainer
            videoSrc="/videos/intro.mp4"
            posterSrc=""
          />
        </div>
      </div>

    </section>
  );
};

export default About;
