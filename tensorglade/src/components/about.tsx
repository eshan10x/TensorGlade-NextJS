const About = () => {
    return (
      <section className="w-full text-center text-primarytext items-center mb-12">
        <h2 className="text-4xl md:text-8xl font-bold leading-tight">
          Take your business
        </h2>
        <h2 className="text-4xl md:text-8xl font-bold leading-tight">
          to new places
        </h2>
  
        <p className="text-lg md:text-2xl mt-6 px-4 md:px-20">
          We are a team of capable and creative engineers who develop software products and provide digital solutions to grow your ideas.
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
  
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10 px-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Our Process"
            className="w-full md:w-80 h-60 object-cover rounded-lg shadow-lg"
          />
  
          <div className="p-6 rounded-lg text-primarytext text-left w-full md:w-64">
            <h3 className="text-xl font-bold">How we operate</h3>
            <p className="text-sm mt-2 text-lg">
              We are a team of capable and creative engineers who develop software products and provide digital solutions to grow your ideas.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  