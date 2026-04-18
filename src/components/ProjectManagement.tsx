import { ScrollReveal } from "@/hooks/useScrollAnimation";
import {
  Workflow,
  Mail,
  Linkedin,
  MessageCircle,
  CheckCircle2,
  Rocket,
  Clock,
  Boxes,
  Palette,
  Users,
  Cpu,
  FileText,
  Globe,
  ExternalLink,
  Github,
} from "lucide-react";

const highlights = [
  { icon: CheckCircle2, label: "15+ YouTube Thumbnails", sub: "managed end-to-end" },
  { icon: Rocket, label: "6+ Major Freelance Pipelines", sub: "concept → final delivery" },
  { icon: Workflow, label: "Web Portfolio Delivered", sub: "Ameen Uddin Ahmed (live)" },
  { icon: Clock, label: "Strict On-Time Delivery", sub: "deadline-driven workflow" },
];

const showcase = [
  {
    icon: Boxes,
    title: "3D / Motion",
    items: ["Ali — 3D Animation", "Kaif — Motion Graphics"],
  },
  {
    icon: Palette,
    title: "Branding",
    items: ["Pizza Planet — Full Brand Ecosystem", "Tariq Bakery", "Hiba Sheikh"],
  },
  {
    icon: Users,
    title: "Characters",
    items: ["Ayaz Hussain — Recovery", "Seerat"],
  },
  {
    icon: Cpu,
    title: "Tech / Research",
    items: ["MindStream AI", "Optigraph", "Spotify Predictor", "Scientific Calculator"],
  },
  {
    icon: FileText,
    title: "Stationery / Academic",
    items: [
      "Wedding Cards & Certificates",
      "Panaflex — DUET / Karachi Uni",
      "Resume Engineering — Mehak, Sana",
      "Family Tree — Mustafa",
    ],
  },
  {
    icon: Workflow,
    title: "Specialized",
    items: ["Data Entry — Himansh Professional Pulse"],
  },
];

const ProjectManagement = () => {
  return (
    <section id="project-management" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-primary -left-40 top-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
            End-to-End <span className="text-gradient">Project Management</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
            Whether it's a creative campaign or a technical deployment, we handle the complexity so you don't have to.
            Share your proposal via Email, WhatsApp, or LinkedIn — every project is managed and delivered strictly on time.
          </p>
        </ScrollReveal>

        {/* KPI strip */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 perspective-container">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.label} delay={i * 80}>
              <div className="glass-card-3d p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <h.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-sm font-bold text-foreground mb-1">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Showcase grid */}
        <ScrollReveal>
          <h3 className="font-display text-xl md:text-2xl font-bold text-center mb-8">
            Portfolio <span className="text-gradient">Showcase</span>
          </h3>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 perspective-container">
          {showcase.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 70}>
              <div className="glass-card-3d p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display text-base font-bold text-foreground">{s.title}</h4>
                </div>
                <ul className="space-y-2 flex-1">
                  {s.items.map((it) => (
                    <li key={it} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}

          {/* Featured Web card */}
          <ScrollReveal delay={420}>
            <div className="glass-card-3d p-6 h-full flex flex-col glow-purple">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display text-base font-bold text-foreground">Web — Featured</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4 flex-1">
                Ameen Uddin Ahmed — Live portfolio site delivered end-to-end with GitHub-tracked development.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://ameem-uddin-ahmed.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 hover:scale-105 transition-all"
                >
                  <ExternalLink size={11} /> Live Site
                </a>
                <a
                  href="https://github.com/Ilmanizami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/50 text-primary text-[11px] font-semibold hover:bg-primary/10 transition-all"
                >
                  <Github size={11} /> GitHub Activity
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Proposals CTA */}
        <ScrollReveal delay={200}>
          <div id="proposals" className="glass-card-3d p-8 max-w-3xl mx-auto text-center glow-purple">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Share Your Proposal</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Pick the channel that works best for you — every inquiry gets a personal response.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/923243564150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_24px_hsl(280_100%_58%/0.5)]"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="mailto:ilmanizami2k23@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/60 text-primary text-sm font-semibold hover:bg-primary/10 transition-all hover:scale-105"
              >
                <Mail size={16} /> Email Inquiry
              </a>
              <a
                href="https://www.linkedin.com/in/ilmanizami/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/60 text-primary text-sm font-semibold hover:bg-primary/10 transition-all hover:scale-105"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectManagement;
