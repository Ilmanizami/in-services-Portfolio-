import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Engineering Lab", id: "engineering-lab" },
  { label: "Creative Studio", id: "projects" },
  { label: "Tool Hub", id: "tools" },
  { label: "Project Management", id: "project-management" },
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
          ? "bg-background/70 backdrop-blur-2xl border-b border-primary/20 shadow-[0_4px_30px_hsl(280_100%_58%/0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* LEFT — Logo + Brand on a single line */}
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
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-all hover:text-primary hover:bg-primary/10 ${
                  location.pathname === item.path ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="text-sm font-medium text-muted-foreground px-3 py-2 rounded-lg transition-all hover:text-primary hover:bg-primary/10"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-primary/20 px-4 pb-4 space-y-1">
          {navItems.map((item) =>
            item.path ? (
              <Link key={item.label} to={item.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/10">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} onClick={() => handleNav(item)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-primary/10 w-full text-left">
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
