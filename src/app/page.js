import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Research from "@/components/Research";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import AmbientBackground from "@/components/AmbientBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-bone">
      <AmbientBackground />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Research />
      <Skills />
      <Education />
      <Experience />
      <Languages />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
