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
import ChatBubble from "@/components/chatbot/chat-bubble";
import { MobileMenuProvider } from "./context/mobile-menu-context";

/**
 * Main App component that organizes the entire portfolio
 * This is the root component that includes all sections of the portfolio
 * and global elements like the navbar, footer, chatbot, and toaster notifications
 */
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
      <ChatBubble />
      <Toaster />
    </div>
  );
}

export default App;
