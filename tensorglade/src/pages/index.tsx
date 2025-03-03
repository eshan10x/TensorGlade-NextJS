import Navbar from "@/components/navbar";
import About from "@/components/about";
import Services from "@/components/services";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar />
      <main className="flex flex-col gap-12 row-start-2 items-center w-full max-w-6xl">
        <About />
        <Services/>
      </main>
    </div>
  );
}
