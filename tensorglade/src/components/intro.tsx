import Image from "next/image";

const Intro = () => {
    return (
        <section id="about" className="w-full relative my-0">
            <div className="absolute inset-0 bg-[#f7f1e3] w-screen left-1/2 -translate-x-1/2" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="">
                            <Image
                                src="/howwework.png"
                                alt="Team working together"
                                width={800}
                                height={533}
                                className="w-full max-w-2xl h-auto rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-rows-2 lg:grid-rows-2 gap-8 items-center">
                        <h1 className="text-4xl md:text-5xl  lg:text-6xl font-bold text-black">
                            How We<br />operate
                        </h1>
                        <p className="text-base md:text-xl text-black">
                            We prioritize client confidence and project success. That&#39;s why we start with a no-obligation 1-month trial and free technical research. Our development methodology is based on stage-wise delivery, significantly reducing risk and ensuring clear, consistent progress. Experience the difference of a transparent and client-centric process.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;