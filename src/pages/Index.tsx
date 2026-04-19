import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EngineeringLab from "@/components/EngineeringLab";
import CreativePortfolio from "@/components/CreativePortfolio";
import PremiumTools from "@/components/PremiumTools";
import ProjectManagement from "@/components/ProjectManagement";
import ProfessionalPulse from "@/components/ProfessionalPulse";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen digital-aura relative w-full max-w-[100vw] overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <EngineeringLab />
      <div className="section-divider" />
      <CreativePortfolio />
      <div className="section-divider" />
      <PremiumTools />
      <div className="section-divider" />
      <ProjectManagement />
      <div className="section-divider" />
      <ProfessionalPulse />
      <div className="section-divider" />
      <TestimonialsSection />
      <div className="section-divider" />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
