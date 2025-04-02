import Navbar from "@/components/navbar";
import About from "@/components/about";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Copyright from "@/components/copyright";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <main className="w-full max-w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mt-20">
        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24 mx-auto">
          <About />
          <Intro />
          <Services />
          <Projects />
          <Contact />
          <Footer />
          <Copyright />
        </div>
      </main>
    </div>
  );
}