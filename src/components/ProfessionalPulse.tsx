import { Github, Linkedin, ExternalLink, Activity, Briefcase, Award, FlaskConical } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const GITHUB_USER = "Ilmanizami";
const LINKEDIN_URL = "https://www.linkedin.com/in/ilma-n-59807b261/";

const linkedInFeed = [
  {
    icon: Briefcase,
    label: "Latest Role",
    title: "Visual Animator",
    meta: "@ MicroNex PAK · Mar 2026",
  },
  {
    icon: Award,
    label: "Recent Certification",
    title: "Adobe Illustrator: Creative Brand System",
    meta: "Coursera · Apr 2025",
  },
  {
    icon: FlaskConical,
    label: "Active Research",
    title: "AES Side-Channel Attacks via Deep Learning",
    meta: "DUET · DLSCA Lab",
  },
  {
    icon: Award,
    label: "Certification",
    title: "AI for Everyone — DeepLearning.AI",
    meta: "Coursera · Feb 2025",
  },
  {
    icon: Briefcase,
    label: "Brand",
    title: "Founder — IN-SERVICES",
    meta: "Design · Dev · AI · Tutoring",
  },
  {
    icon: Award,
    label: "Achievement",
    title: "Top 1% AI Artist — RedverseAI",
    meta: "2025",
  },
];

const githubStats = [
  { label: "Public Repos", value: "30+" },
  { label: "Total Stars", value: "45" },
  { label: "Contributions", value: "600+" },
  { label: "Followers", value: "20" },
];

const topLanguages = [
  { name: "Python", pct: 34, color: "hsl(280 100% 70%)" },
  { name: "TypeScript", pct: 26, color: "hsl(210 100% 65%)" },
  { name: "JavaScript", pct: 18, color: "hsl(48 95% 60%)" },
  { name: "C++", pct: 12, color: "hsl(150 70% 50%)" },
  { name: "HTML/CSS", pct: 10, color: "hsl(20 90% 60%)" },
];

const ProfessionalPulse = () => {
  const heatmapUrl = `https://ghchart.rshah.org/8b5cf6/${GITHUB_USER}`;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="hidden md:block floating-orb w-72 h-72 bg-primary -right-36 top-20" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(150_70%_50%)] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(150_70%_45%)]" />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[hsl(150_65%_55%)] font-semibold">Live</span>
            <Activity className="w-5 h-5 text-[hsl(150_65%_50%)]" />
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Professional <span className="text-gradient-gold">Pulse</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mt-3 mb-10 md:mb-14 text-sm md:text-base px-2">
            Live GitHub activity & professional feed — auto-synced with my real coding contributions and LinkedIn presence.
          </p>
        </ScrollReveal>

        {/* Responsive Dashboard Grid: stacked on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
          {/* GitHub Activity Widget */}
          <ScrollReveal delay={50}>
            <div className="glass-card-3d oval-glow p-4 md:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Github className="w-5 h-5 text-foreground flex-shrink-0" />
                  <h3 className="font-display text-sm md:text-base font-semibold truncate">GitHub Activity</h3>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[hsl(150_65%_55%)] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150_70%_45%)] animate-pulse" />
                    Live
                  </span>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors"
                >
                  @{GITHUB_USER} <ExternalLink size={11} />
                </a>
              </div>

              {/* Fixed-height scrollable container */}
              <div className="flex-1 h-[420px] md:h-[500px] overflow-y-auto pr-1 space-y-3 custom-scroll">
                <div className="flex items-center justify-center bg-background/40 rounded-lg p-3 md:p-4 overflow-x-auto">
                  <img
                    src={heatmapUrl}
                    alt={`${GITHUB_USER} GitHub contribution heatmap`}
                    loading="lazy"
                    className="max-w-full h-auto opacity-90 min-w-[600px] sm:min-w-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {githubStats.map((s) => (
                    <div key={s.label} className="rounded-lg border border-border/40 bg-background/40 p-3 text-center">
                      <p className="font-display text-xl font-bold text-primary">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-border/40 bg-background/40 p-4 space-y-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Top Languages</p>
                  {topLanguages.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground font-medium">{l.name}</span>
                        <span className="text-muted-foreground">{l.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${l.pct}%`, background: l.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* LinkedIn Feed Widget */}
          <ScrollReveal delay={150}>
            <div className="glass-card-3d oval-glow p-4 md:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Linkedin className="w-5 h-5 text-[#0A66C2] flex-shrink-0" />
                  <h3 className="font-display text-sm md:text-base font-semibold truncate">LinkedIn Feed</h3>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[hsl(150_65%_55%)] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150_70%_45%)] animate-pulse" />
                    Live
                  </span>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors"
                >
                  View profile <ExternalLink size={11} />
                </a>
              </div>

              {/* Fixed-height scrollable feed */}
              <div className="flex-1 h-[420px] md:h-[500px] overflow-y-auto pr-1 space-y-3 custom-scroll">
                {linkedInFeed.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 md:p-4 rounded-lg bg-background/40 border border-border/40 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 border border-primary/30 flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                          <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                          <p className="text-xs text-primary mt-1">{item.meta}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="text-muted-foreground">2,481 followers · 500+ connections</span>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(42_75%_65%)] hover:translate-x-1 transition-transform"
                >
                  Open LinkedIn →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalPulse;
