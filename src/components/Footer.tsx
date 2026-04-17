import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/40 backdrop-blur-sm py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          © 2026 <span className="font-serif-display text-foreground font-semibold">IN-<span className="text-primary">SERVICES</span></span> · Ilma Nizami
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap justify-center">
          <a href="mailto:ilmanizami2k23@gmail.com" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail size={12} /> ilmanizami2k23@gmail.com
          </a>
          <a href="tel:03243564150" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone size={12} /> 03243564150
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
