import Header from "@/components/Header";
import HomeSection from "@/components/sections/home/HomeSection";
import TerminalSection from "@/components/sections/TerminalSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HomeSection />
        <TerminalSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
