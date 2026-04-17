import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { ArrowDown, Github, Linkedin, Mail, Phone, Calendar, BadgeCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-primary top-10 -left-48" />
      <div className="floating-orb w-72 h-72 bg-accent bottom-20 -right-36" style={{ animationDelay: "3s" }} />
      <div className="floating-orb w-64 h-64 bg-primary top-1/2 left-1/3" style={{ animationDelay: "5s", opacity: 0.08 }} />

      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-rotate-slow opacity-10 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-8 rounded-full border border-accent/20" />
        <div className="absolute inset-16 rounded-full border border-primary/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-up perspective-container">
          <div className="relative inline-block">
            <div
              className="relative mx-auto mb-8 overflow-hidden animate-pulse-glow shadow-[0_0_60px_hsl(42_75%_60%/0.35)] border-2 border-[hsl(42_75%_60%/0.5)] bg-background/50 rounded-full"
              style={{ width: "128px", height: "128px", aspectRatio: "1 / 1" }}
            >
              <img
                src={logo}
                alt="IN-SERVICES Logo"
                className="absolute inset-0 w-full h-full p-2"
                style={{ objectFit: "contain", aspectRatio: "1 / 1" }}
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-up-delay-1 mb-3">
          <h1 className="font-serif-display text-6xl md:text-8xl font-bold tracking-wide text-gradient-gold leading-none">
            IN-SERVICES
          </h1>
        </div>

        <div className="animate-fade-up-delay-1 flex items-center justify-center gap-2 mb-2">
          <p className="font-display text-lg md:text-2xl text-foreground/90 font-light tracking-wide">
            Ilma Nizami <span className="text-muted-foreground">|</span> <span className="text-primary">Creative Director</span>
          </p>
          <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>

        <p className="animate-fade-up-delay-1 italic font-serif-display text-sm md:text-base text-[hsl(42_75%_65%)] mb-5">
          "Where Design Meets Visual Creativity"
        </p>

        <p className="animate-fade-up-delay-2 text-xs md:text-sm text-primary font-medium mb-4">
          BSCS-DUET'26 · AI & Cybersecurity Researcher (DLSCA) · Visual Animator @ MicroNex PAK · AI Artist @ RedverseAI
        </p>

        <p className="animate-fade-up-delay-2 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
          Graphic Designer · Video Editor · Reel Animator · Developer · Project Manager · Premium Tools Provider
        </p>
        <p className="animate-fade-up-delay-2 text-sm text-muted-foreground max-w-2xl mx-auto mb-3">
          AI & Cybersecurity Researcher (DLSCA) | Junior AI & Compiler Dev | Intern @ Inventive Tech & MicroNex PAK
        </p>
        <p className="animate-fade-up-delay-3 text-sm text-muted-foreground max-w-xl mx-auto mb-8">
          Bridging Complex Systems, Creative Design & Business Strategy — serving <span className="text-primary font-semibold">80+ clients</span> locally & internationally from Karachi, Pakistan.
        </p>

        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-3 flex-wrap mb-6">
          <a href="https://github.com/Ilmanizami" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-3 hover:bg-primary/20 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ilmanizami/" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-3 hover:bg-primary/20 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:ilmanizami2k23@gmail.com" className="glass-card-3d p-3 hover:bg-primary/20 transition-colors">
            <Mail size={20} />
          </a>
          <a href="tel:03243564150" className="glass-card-3d p-3 hover:bg-primary/20 transition-colors">
            <Phone size={20} />
          </a>
          <a href="https://calendly.com/ilmanizami2k23/30min" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-3 hover:bg-primary/20 transition-colors">
            <Calendar size={20} />
          </a>
        </div>

        <div className="animate-fade-up-delay-4 flex flex-wrap items-center justify-center gap-3 mb-12">
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105">
            <Mail size={16} /> Get in Touch
          </a>
          <a href="https://calendly.com/ilmanizami2k23/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all hover:scale-105">
            <Calendar size={16} /> Book a Meeting
          </a>
        </div>

        <a href="#about" className="inline-block animate-bounce text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
