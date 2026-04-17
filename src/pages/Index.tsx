import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import CreativePortfolio from "@/components/CreativePortfolio";
import ToolCloud from "@/components/ToolCloud";
import PremiumTools from "@/components/PremiumTools";
import ProfessionalPulse from "@/components/ProfessionalPulse";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <CreativePortfolio />
      <div className="section-divider" />
      <ToolCloud />
      <div className="section-divider" />
      <PremiumTools />
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
