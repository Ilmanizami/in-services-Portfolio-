import { Phone, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { OWNER_EMAIL } from "@/lib/admin";

const Footer = () => {
  const { user, isAdmin } = useAuth();
  const showAdmin = !!user && isAdmin && user.email?.toLowerCase() === OWNER_EMAIL;

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
          {showAdmin && (
            <Link to="/admin-panel" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors">
              <ShieldCheck size={12} /> Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
