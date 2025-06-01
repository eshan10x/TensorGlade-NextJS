'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import VideoContainer from "@/atoms/videocontainer";
import { Play } from 'lucide-react';

const ThreeWaveBackground = dynamic(() => import('../atoms/ThreeWaveBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 overflow-hidden" />
  )
})

const About = () => {
  const [showVideo, setShowVideo] = React.useState(false);

  return (
    <section id="about\" className="w-full text-center text-primarytext items-center">
      <div className="absolute inset-0 -top-16 z-0 overflow-hidden">
        <ThreeWaveBackground />
      </div>
      <div className="relative w-full text-center text-primarytext items-center -top-24 pt-28 min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Innovate with Intelligence
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            AI Solutions for Limitless
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Growth
          </h2>
        </div>

        <p className="text-lg max-w-6xl md:text-2xl mt-6 md:mt-12 lg:mt-16 px-6 md:px-16 max-w-5xl mx-auto text-center">
          We empower startups with data-driven MVPs and expertly curated datasets. Shape the future by transforming your idea into an AI-Powered MVP today.
        </p>

        <div className="max-w-6xl scroll-animate opacity-100 transition-all duration-1000 ease-out delay-500 mt-12 relative">
          {!showVideo ? (
            <div className="relative">
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex items-center justify-center">
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg hover:bg-opacity-100 transition-all duration-200 group"
                >
                  <Play className="w-8 h-8 text-orange-500 group-hover:text-orange-600" />
                </button>
              </div>
              <div className="w-full aspect-video bg-gray-200 rounded-3xl"></div>
            </div>
          ) : (
            <VideoContainer
              videoSrc="/videos/intro.mp4"
              posterSrc=""
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default About;