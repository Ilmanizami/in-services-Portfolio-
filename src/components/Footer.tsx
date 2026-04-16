import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="text-foreground font-medium">IN Services</span> | Designing the Future.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Ilmanizami" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/ilmanizami/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="mailto:ilmanizami2k23@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={16} />
            </a>
            <a href="tel:03243564150" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
