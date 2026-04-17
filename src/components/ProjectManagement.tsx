import { ScrollReveal } from "@/hooks/useScrollAnimation">;
import { Workflow, Mail, Linkedin, MessageCircle, CheckCircle2, Rocket, Clock } from "lucide-react";

const highlights = [
  { icon: CheckCircle2, label: "15+ YouTube Thumbnails", sub: "managed end-to-end" },
  { icon: Rocket, label: "6+ Major Freelance Pipelines", sub: "concept → final delivery" },
  { icon: Workflow, label: "Web Portfolio Delivered", sub: "Ameen Uddin Ahmed (live)" },
  { icon: Clock, label: "Strict On-Time Delivery", sub: "deadline-driven workflow" },
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
            Share your proposal via Email, WhatsApp, or LinkedIn — our team will manage and deliver your vision strictly on time.
          </p>
        </ScrollReveal>

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

        <ScrollReveal delay={200}>
          <div className="glass-card-3d p-8 max-w-3xl mx-auto text-center glow-purple">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Share Your Proposal</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Pick the channel that works best for you — every inquiry gets a personal response.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/923243564150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href="mailto:ilmanizami2k23@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/50 text-primary text-sm font-semibold hover:bg-primary/10 transition-all"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/ilmanizami/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/50 text-primary text-sm font-semibold hover:bg-primary/10 transition-all"
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
