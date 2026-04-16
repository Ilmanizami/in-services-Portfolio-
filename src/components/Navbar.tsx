import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Creative Works", id: "projects" },
  { label: "Solutions & Web", path: "/services" },
  { label: "Premium Tools", id: "tools" },
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
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 shadow-[0_0_16px_hsl(265_60%_55%/0.3)] flex-shrink-0" style={{ aspectRatio: "1/1" }}>
            <img src={logo} alt="IN Logo" className="w-full h-full object-contain bg-background/80" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">IN Services</span>
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

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
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
