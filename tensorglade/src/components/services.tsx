import { servicesData } from "@/data/servicesdata";
import Image from "next/image";

const Services = () => {
  return (
    <section id="services" className="w-full max-w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 text-primarytext mx-auto">
      {servicesData.map((service, index) => (
        <div
          key={service.id}
          className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
            <p className="text-lg text-gray-primary mb-6">{service.description}</p>

            <div className="flex flex-col gap-4">
              {service.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-2xl">{point.icon}</span>
                  <p className="text-lg font-medium">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              height={300}
              className="w-full max-w-lg h-auto rounded-lg"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;