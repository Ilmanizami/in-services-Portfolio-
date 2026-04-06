import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const scrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="IN Logo" className="h-9 w-9 rounded-full" />
          <span className="font-display font-bold text-lg text-foreground">Ilma Nizami</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={() => scrollTo("about")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</button>
          <button onClick={() => scrollTo("projects")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Projects</button>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-4 space-y-3">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2">{item.label}</Link>
          ))}
          <button onClick={() => scrollTo("about")} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2 w-full text-left">About</button>
          <button onClick={() => scrollTo("projects")} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2 w-full text-left">Projects</button>
          <button onClick={() => scrollTo("contact")} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2 w-full text-left">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
