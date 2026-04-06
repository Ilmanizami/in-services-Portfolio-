import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-up">
          <img src={logo} alt="IN Logo" className="w-28 h-28 rounded-full mx-auto mb-8 animate-float shadow-[0_0_60px_hsl(265_60%_55%/0.3)]" />
        </div>

        <h1 className="animate-fade-up-delay-1 font-display text-5xl md:text-7xl font-bold mb-4">
          <span className="text-foreground">Ilma </span>
          <span className="text-gradient">Nizami</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Designer · Developer · Video Editor · Project Manager
        </p>
        <p className="animate-fade-up-delay-2 text-sm text-muted-foreground max-w-xl mx-auto mb-8">
          Bridging Complex Systems, Creative Design & Business Strategy — serving 80+ clients locally & internationally.
        </p>

        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-4 mb-12">
          <a href="https://github.com/Ilmanizami" target="_blank" rel="noopener noreferrer" className="glass-card p-3 hover:bg-primary/20 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ilmanizami/" target="_blank" rel="noopener noreferrer" className="glass-card p-3 hover:bg-primary/20 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:ilmanizami2k23@gmail.com" className="glass-card p-3 hover:bg-primary/20 transition-colors">
            <Mail size={20} />
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
