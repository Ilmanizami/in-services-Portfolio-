import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { BadgeCheck, Sparkles, Palette, Film, Brain } from "lucide-react";

const tools = [
  {
    name: "Canva Premium",
    icon: Palette,
    desc: "Full access to advanced design assets, premium templates, and team collaboration features.",
    users: ["M. Nafees", "M. Umair", "Waqar Younus"],
  },
  {
    name: "CapCut Pro",
    icon: Film,
    desc: "Influencer-grade video editing with advanced effects, transitions, and high-retention templates.",
    users: ["Tanzila Rohail (Influencer)", "M. Arham"],
  },
  {
    name: "ChatGPT Plus (GPT-4)",
    icon: Brain,
    desc: "Advanced AI access for professional workflows, research assistance, and content generation.",
    users: ["Samad"],
  },
  {
    name: "More Tools & Software",
    icon: Sparkles,
    desc: "Custom software setup, tool licensing, and tech support at affordable rates for students and professionals.",
    users: ["Available for all clients"],
  },
];

const PremiumTools = () => {
  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-accent -right-36 top-10" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-center mb-3">
            Premium <span className="text-gradient-gold">Tool Hub</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
            Verified fulfillment of premium software at affordable rates — every card features a Verified Service User badge.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 100}>
              <div className="glass-card-3d p-6 h-full flex flex-col group relative overflow-hidden glow-emerald">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg" style={{ background: "linear-gradient(135deg, hsl(150 65% 45%), hsl(160 70% 40%))" }}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 flex-1">{tool.desc}</p>
                <div className="space-y-1.5 mb-3">
                  {tool.users.map((user) => (
                    <div key={user} className="flex items-center gap-1.5 text-[11px] text-foreground/80">
                      <BadgeCheck size={12} className="text-[hsl(150_65%_50%)] shrink-0" />
                      <span>{user}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-border/40">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[hsl(150_65%_50%)]">
                    <BadgeCheck size={10} /> Verified Service User
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumTools;
