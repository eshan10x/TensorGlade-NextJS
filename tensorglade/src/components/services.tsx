import { servicesData } from "@/data/servicesdata"

const Services = () => {
  return (
    <section className="py-16 px-4 md:px-16 text-primarytext">
      {servicesData.map((service, index) => (
        <div
          key={service.id}
          className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{service.description}</p>

            <div className="flex flex-col gap-4">
              {service.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-2xl">{point.icon}</span>
                  <p className="text-lg font-medium">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={service.image}
              alt={service.title}
              className="w-full max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
