import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import VisualizationSection from "@/components/visualization-section";
import GameSection from "@/components/game-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { MobileMenuProvider } from "./context/mobile-menu-context";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <MobileMenuProvider>
        <Navbar />
      </MobileMenuProvider>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <VisualizationSection />
        <GameSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
