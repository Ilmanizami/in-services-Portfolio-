import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { BadgeCheck, Brain, Palette, Search, GraduationCap, Zap, MessageCircle } from "lucide-react";

type Bundle = {
  title: string;
  icon: React.ElementType;
  tagline: string;
  tools: string[];
};

const bundles: Bundle[] = [
  {
    title: "AI Hub",
    icon: Brain,
    tagline: "Next-gen generative & language models",
    tools: ["Heygen", "Veo 3", "Grok", "Higgsfield (Starter / Plus / Ultra)", "ChatGPT Plus"],
  },
  {
    title: "Creative Suite",
    icon: Palette,
    tagline: "Design, video & visual production",
    tools: [
      "Canva Pro / Edu",
      "CapCut Pro",
      "PicsArt Pro",
      "Filmora 14",
      "Freepik Premium",
      "Adobe Creative Cloud",
      "Adobe Photoshop",
      "Adobe After Effects",
      "Photopea",
      "Envato",
      "Storyblocks",
      "Leonardo AI",
      "Vyond",
      "InVideo",
    ],
  },
  {
    title: "SEO & Writing",
    icon: Search,
    tagline: "Research, ranking & content engines",
    tools: [
      "Semrush",
      "Moz Pro",
      "Grammarly Premium",
      "Quillbot Premium",
      "Wordtune",
      "Jasper AI",
      "WriterSonic",
      "HIX AI",
      "Ubersuggest",
      "Turnitin",
    ],
  },
  {
    title: "Productivity & Learning",
    icon: GraduationCap,
    tagline: "Office, courses & secure browsing",
    tools: ["Office 365", "Udemy", "Coursera", "NordVPN / PIA VPN", "RenderForest", "Helium 10"],
  },
];

const PremiumTools = () => {
  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -right-36 top-10" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
            Instant Access to <span className="text-gradient">Premium Digital Tools</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-3 text-sm md:text-base">
            IN-SERVICES Subscription Hub — Both <span className="text-primary font-semibold">Private</span> and{" "}
            <span className="text-primary font-semibold">Shared</span> access available for every tool listed below.
          </p>
          <p className="text-xs text-muted-foreground text-center mb-12 italic">
            ⚡ Instant Activation · 🛡️ Reliable Service · 🕒 24/7 Support
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-10 perspective-container">
          {bundles.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 100}>
              <div className="glass-card-3d p-6 h-full flex flex-col glow-purple group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{b.title}</h3>
                    <p className="text-xs text-muted-foreground">{b.tagline}</p>
                  </div>
                </div>

                {/* Oval tool chips — unified standard */}
                <div className="flex flex-wrap gap-2 mb-5 flex-1 content-start">
                  {b.tools.map((t) => (
                    <span
                      key={t}
                      className="oval-glow inline-flex items-center justify-center text-[11px] leading-none px-3.5 h-7 rounded-full whitespace-nowrap bg-background/40 backdrop-blur-md text-foreground/95 hover:bg-primary/15 hover:scale-[1.05] transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    <BadgeCheck size={12} /> Verified Service
                  </span>
                  <a
                    href="https://wa.me/923243564150"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_18px_hsl(280_100%_58%/0.45)]"
                  >
                    <MessageCircle size={12} /> WhatsApp to Activate
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="glass-card p-6 text-center max-w-3xl mx-auto border border-primary/30">
            <p className="text-sm md:text-base text-foreground/90 mb-4">
              Contact me to activate your choice — get genuine, fully-managed access at affordable rates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/923243564150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105"
              >
                <Zap size={14} /> WhatsApp to Activate
              </a>
              <a
                href="mailto:ilmanizami2k23@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/50 text-primary text-sm font-semibold hover:bg-primary/10 transition-all"
              >
                Email Inquiry
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PremiumTools;
