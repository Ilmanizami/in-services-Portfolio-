import { useState, useEffect, useRef } from "react";
import {
  Palette, Video, Code, GraduationCap, Target, Briefcase, PenTool, Printer,
  Zap, Layout, ClipboardCheck, Shapes, Key, Database,
} from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

type Service = {
  id: string;
  title: string;
  short: string;
  Icon: typeof Palette;
};

const services: Service[] = [
  { id: "graphic", title: "Graphic Designing", short: "2D, 3D, Pixel Art, V-Tubers, Labels & Family Trees.", Icon: Palette },
  { id: "video", title: "Video Editing", short: "Reels, motion graphics & long-form animated content.", Icon: Video },
  { id: "art3d", title: "2D/3D Art & Animation", short: "High-fidelity models & character animations.", Icon: Shapes },
  { id: "uiux", title: "UI/UX Designer", short: "User-centric interfaces & seamless experiences.", Icon: Layout },
  { id: "automation", title: "Automation Workflow", short: "Optimizing business with AI & auto-flows.", Icon: Zap },
  { id: "pm", title: "Project Manager", short: "End-to-end execution & team coordination.", Icon: ClipboardCheck },
  { id: "content", title: "Content Creation", short: "Social media strategy & viral storytelling.", Icon: PenTool },
  { id: "tools", title: "Digital Tools Subscription", short: "Premium access to Canva, Adobe & AI tools.", Icon: Key },
  { id: "data", title: "Data Entry & Admin", short: "Accurate data management & virtual assistance.", Icon: Database },
  { id: "fyp", title: "University Solutions", short: "Custom assignments, FYP & documentation.", Icon: GraduationCap },
  { id: "client", title: "Client Hunter", short: "Lead generation & outreach for brands.", Icon: Target },
  { id: "hr", title: "HR Services", short: "Resume design, hiring support & talent matching.", Icon: Briefcase },
  { id: "web", title: "Portfolio Web Design", short: "Premium personal & business portfolio sites.", Icon: Code },
  { id: "print", title: "Printing Hub", short: "Cards, panaflex, stickers & wedding stationery.", Icon: Printer },
];

const InteractiveHub = () => {
  const [active, setActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(560);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth ?? 640;
      setSize(Math.min(720, Math.max(400, w)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const activeService = services.find((s) => s.id === active);
  const radius = size * 0.4;
  const center = size / 2;

  return (
    <section id="hub" className="py-20 relative scroll-mt-24">
      <div className="container mx-auto px-4 relative z-10">
        {/* Identity header */}
        <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-card-3d oval-glow p-5 text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Identity</p>
              <p className="text-sm text-foreground/90">
                Final-year BSCS Student (DUET), Visual Animator, and Graphic Designer.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="glass-card-3d oval-glow p-5 text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Specialization</p>
              <p className="text-sm text-foreground/90">
                2D / 3D Art, Motion Graphics, and Premium Printing Solutions.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              The <span className="text-gradient">IN</span> Service Universe
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              A 360° interactive hub of everything we deliver.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: 360° hub */}
        <div ref={containerRef} className="hidden md:block relative mx-auto" style={{ maxWidth: 640 }}>
          <div
            className="relative mx-auto"
            style={{ width: size, height: size, willChange: "transform" }}
            onMouseLeave={() => setActive(null)}
          >
            {/* SVG connectors */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
            >
              {services.map((s, i) => {
                const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                const isActive = active === s.id;
                const dim = active && !isActive;
                return (
                  <line
                    key={s.id}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={isActive ? "hsl(150 100% 55%)" : "hsl(280 100% 70%)"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeOpacity={dim ? 0.15 : isActive ? 0.95 : 0.45}
                    style={{
                      filter: isActive ? "drop-shadow(0 0 6px hsl(150 100% 55% / 0.8))" : undefined,
                      transition: "all 0.25s ease",
                    }}
                  />
                );
              })}
            </svg>

            {/* Center IN node */}
            <div
              className="absolute flex flex-col items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-extrabold animate-pulse-glow"
              style={{
                width: size * 0.22,
                height: size * 0.22,
                left: center - size * 0.11,
                top: center - size * 0.11,
                fontSize: size * 0.07,
                boxShadow: "0 0 40px hsl(280 100% 70% / 0.7), inset 0 0 20px hsl(282 100% 80% / 0.3)",
                willChange: "transform",
              }}
            >
              IN
            </div>

            {/* Outer nodes */}
            {services.map((s, i) => {
              const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
              const x = center + radius * Math.cos(angle);
              const y = center + radius * Math.sin(angle);
              const nodeSize = size * 0.16;
              const isActive = active === s.id;
              const dim = active && !isActive;
              return (
                <button
                  key={s.id}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  className="absolute glass-card-3d oval-glow flex flex-col items-center justify-center text-center group cursor-pointer"
                  style={{
                    width: nodeSize,
                    height: nodeSize,
                    left: x - nodeSize / 2,
                    top: y - nodeSize / 2,
                    borderRadius: "50%",
                    opacity: dim ? 0.4 : 1,
                    filter: dim ? "blur(1px)" : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.3s ease",
                    willChange: "transform",
                  }}
                  aria-label={s.title}
                >
                  <s.Icon
                    size={nodeSize * 0.32}
                    className="text-primary"
                    style={{ color: isActive ? "hsl(150 100% 55%)" : undefined }}
                  />
                  <span className="text-[10px] font-semibold mt-1 px-1 leading-tight text-foreground">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tooltip below hub */}
          <div className="text-center mt-6 min-h-[3rem]">
            {activeService ? (
              <div className="inline-block px-5 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur animate-fade-up">
                <span className="font-semibold text-primary">{activeService.title}:</span>{" "}
                <span className="text-sm text-foreground/90">{activeService.short}</span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Hover any orbit node to explore the service.</p>
            )}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden relative max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div
              className="w-20 h-20 rounded-full bg-primary text-primary-foreground font-display font-extrabold text-2xl flex items-center justify-center animate-pulse-glow"
              style={{ boxShadow: "0 0 30px hsl(280 100% 70% / 0.7)" }}
            >
              IN
            </div>
          </div>
          <div className="relative pl-8">
            <div
              className="absolute left-3 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, hsl(280 100% 70%), hsl(280 100% 50% / 0.2))" }}
            />
            <div className="space-y-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="relative glass-card-3d oval-glow p-3 flex items-start gap-3"
                >
                  <div
                    className="absolute -left-[1.4rem] top-4 w-3 h-3 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 10px hsl(280 100% 70% / 0.8)" }}
                  />
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <s.Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.short}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHub;
