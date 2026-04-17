import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Creative Works", id: "projects" },
  { label: "Tool Hub", id: "tools" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item: (typeof navItems)[0]) => {
    setOpen(false);
    if (item.path) return;
    if (item.id) {
      if (location.pathname !== "/") {
        window.location.href = `/#${item.id}`;
        return;
      }
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-primary/10 shadow-[0_4px_30px_hsl(265_60%_55%/0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 shrink-0 min-w-0">
          <div
            className="relative shrink-0 rounded-full overflow-hidden border border-[hsl(42_75%_60%/0.4)] shadow-[0_0_18px_hsl(42_75%_60%/0.25)] bg-background/80"
            style={{ width: "40px", height: "40px", aspectRatio: "1 / 1", flex: "0 0 40px" }}
          >
            <img
              src={logo}
              alt="IN-SERVICES Logo"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "contain", aspectRatio: "1 / 1" }}
            />
          </div>
          <span className="font-serif-display font-bold text-lg md:text-xl text-gradient-gold tracking-wide whitespace-nowrap">
            IN-SERVICES
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-all hover:text-primary hover:bg-primary/5 ${
                  location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="text-sm font-medium text-muted-foreground px-3 py-2 rounded-lg transition-all hover:text-primary hover:bg-primary/5"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/90 backdrop-blur-2xl border-b border-primary/10 px-4 pb-4 space-y-1">
          {navItems.map((item) =>
            item.path ? (
              <Link key={item.label} to={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/5">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} onClick={() => handleNav(item)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/5 w-full text-left">
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
