import { Github, Linkedin, ExternalLink, Activity } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const GITHUB_USER = "Ilmanizami";
const LINKEDIN_URL = "https://www.linkedin.com/in/ilma-n-59807b261/";

const ProfessionalPulse = () => {
  // Public, no-auth GitHub contribution heatmap (SVG embed via ghchart.rshah.org)
  const heatmapUrl = `https://ghchart.rshah.org/8b5cf6/${GITHUB_USER}`;
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=radical&hide_border=true&bg_color=0E1024&title_color=C9A24A&icon_color=8b5cf6&text_color=cccccc`;
  const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=radical&hide_border=true&bg_color=0E1024&title_color=C9A24A&text_color=cccccc`;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -right-36 top-20" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-[hsl(150_65%_50%)] animate-pulse" />
            <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-center">
              Professional <span className="text-gradient-gold">Pulse</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-sm md:text-base">
            Live GitHub activity & professional feed — auto-synced with my real coding contributions and LinkedIn presence.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* GitHub Heatmap */}
          <ScrollReveal delay={50}>
            <div className="glass-card-3d p-6 lg:col-span-2 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-foreground" />
                  <h3 className="font-display text-base font-semibold">GitHub Contributions</h3>
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
              <div className="flex-1 flex items-center justify-center bg-background/40 rounded-lg p-4 overflow-x-auto">
                <img
                  src={heatmapUrl}
                  alt={`${GITHUB_USER} GitHub contribution heatmap`}
                  loading="lazy"
                  className="max-w-full h-auto opacity-90"
                />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={statsUrl} alt="GitHub stats" loading="lazy" className="w-full rounded-lg border border-border/40" />
                <img src={topLangsUrl} alt="Top languages" loading="lazy" className="w-full rounded-lg border border-border/40" />
              </div>
            </div>
          </ScrollReveal>

          {/* LinkedIn Pulse */}
          <ScrollReveal delay={150}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-3d p-6 h-full flex flex-col group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="font-display text-base font-semibold">LinkedIn Pulse</h3>
              </div>
              <div className="flex-1 space-y-4">
                <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                  <p className="text-xs text-muted-foreground mb-1">Latest Role</p>
                  <p className="text-sm font-semibold text-foreground">Visual Animator</p>
                  <p className="text-xs text-primary">@ MicroNex PAK · Mar 2026</p>
                </div>
                <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                  <p className="text-xs text-muted-foreground mb-1">Recent Certification</p>
                  <p className="text-sm font-semibold text-foreground">Adobe Illustrator: Creative Brand System</p>
                  <p className="text-xs text-primary">Coursera · Apr 2025</p>
                </div>
                <div className="p-4 rounded-lg bg-background/40 border border-border/40">
                  <p className="text-xs text-muted-foreground mb-1">Active Research</p>
                  <p className="text-sm font-semibold text-foreground">AES Side-Channel Attacks via Deep Learning</p>
                  <p className="text-xs text-primary">DUET · DLSCA Lab</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">2,481 followers · 500+ connections</span>
                <span className="text-[hsl(42_75%_65%)] group-hover:translate-x-1 transition-transform">View →</span>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalPulse;
