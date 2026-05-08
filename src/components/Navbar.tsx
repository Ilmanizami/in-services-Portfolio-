import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  path?: string;          // route to navigate to
  id?: string;            // section id on home page
  serviceId?: string;     // section id on /services page
};

const navItems: NavItem[] = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Experience", id: "professional-pulse" },
  { label: "Work", id: "portfolio-showcase" },
  { label: "Services", id: "creative-works" },
  { label: "Store", id: "digital-tools" },
  { label: "Reviews", id: "feedback" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", id: "proposal" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (item: NavItem) => {
    setOpen(false);

    if (item.path) {
      if (location.pathname !== item.path) navigate(item.path);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.serviceId) {
      if (location.pathname !== "/services") {
        navigate(`/services#${item.serviceId}`);
      } else {
        scrollToId(item.serviceId);
      }
      return;
    }

    if (item.id) {
      if (location.pathname !== "/") {
        navigate(`/#${item.id}`);
      } else {
        scrollToId(item.id);
      }
    }
  };

  // Smooth-scroll to hash on home page after navigation
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToId(id), 100);
    }
  }, [location.pathname, location.hash]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b border-primary/20 shadow-[0_4px_30px_hsl(280_100%_58%/0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 shrink-0 min-w-0">
          <div
            className="relative shrink-0 rounded-full overflow-hidden border border-primary/40 shadow-[0_0_18px_hsl(280_100%_58%/0.35)] bg-background/80"
            style={{ width: "40px", height: "40px", aspectRatio: "1 / 1", flex: "0 0 40px" }}
          >
            <img
              src={logo}
              alt="IN-SERVICES Logo"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "contain", aspectRatio: "1 / 1" }}
            />
          </div>
          <span className="font-serif-display font-bold text-lg md:text-xl text-foreground tracking-wide whitespace-nowrap">
            IN-<span className="text-primary">SERVICES</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="text-sm font-medium text-muted-foreground px-3 py-2 rounded-lg transition-all hover:text-primary hover:bg-primary/10"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-primary/20 px-4 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/10 w-full text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
