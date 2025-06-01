"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projectData } from "@/data/projectdata";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide,  } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from "swiper/modules";

const Projects = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="projects" className="w-full py-16 bg-white">
      <div className="w-full max-w-none">
        <div className="flex justify-between items-center mb-10 px-4 sm:px-8 md:px-12 lg:px-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black">Projects...</h2>
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 bg-transparent hover:bg-gray-100 rounded-full text-black border border-black"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 bg-transparent hover:bg-gray-100 rounded-full text-black border border-black"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="w-full pl-4 sm:pl-8 md:pl-12 lg:pl-16"
          >
            {projectData.map((project, index) => (
              <SwiperSlide 
                key={index} 
                className="h-auto"
                style={{ width: "calc(100% - 80px)", maxWidth: "850px", minWidth: "450px" }}
              >
                <div className="bg-[#F5F0E8] rounded-3xl overflow-hidden h-[480px] flex flex-col shadow-sm">
                  <div className="flex flex-row h-[400px]">
                    <div className="w-1/4 p-6 border-r border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="text-4xl text-primarytext font-bold">800%</span>
                        <div className="text-sm text-primarytext mt-1">saved in Payroll costs</div>
                      </div>
                      
                      <div className="h-12 w-full relative">
                        {project.companyLogo ? (
                          <Image
                            src={project.companyLogo}
                            alt="Company logo"
                            fill
                            className="object-contain object-left"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center">
                            <svg width="100" height="40" viewBox="0 0 100 40" className="text-gray-400">
                              <rect width="100" height="40" fill="currentColor" fillOpacity="0.2" />
                              <text x="50" y="20" textAnchor="middle" dominantBaseline="middle" fill="currentColor">Logo</text>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-3/4 h-full relative overflow-hidden">
                      <div className="absolute inset-2 rounded-2xl overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title || "Project image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                            className="object-cover"
                            priority={index < 2}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/placeholder-image.jpg";
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
                            <span className="text-primarytext text-lg">Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[80px] flex-shrink-0 p-4 border-t border-gray-200 flex items-center">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-xl font-medium pr-4 line-clamp-2">
                        {project.title || "How Technology Aloha uses global talent to boost service levels"}
                      </h3>
                      <a 
                        href={project.link || "#"} 
                        className="text-sm font-bold text-black hover:underline whitespace-nowrap ml-4"
                      >
                        Read story
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Projects;