import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { BadgeCheck, Sparkles, Palette, Film, Brain } from "lucide-react";

const tools = [
  {
    name: "Canva Premium",
    icon: Palette,
    desc: "Full access to advanced design assets, premium templates, and team collaboration features.",
    users: ["M. Nafees", "M. Umair", "Waqar Younus"],
    color: "from-[hsl(265_60%_55%)] to-[hsl(200_70%_55%)]",
  },
  {
    name: "CapCut Pro",
    icon: Film,
    desc: "Influencer-grade video editing with advanced effects, transitions, and high-retention templates.",
    users: ["Tanzila Rohail (Influencer)", "M. Arham"],
    color: "from-[hsl(265_60%_55%)] to-[hsl(320_70%_55%)]",
  },
  {
    name: "ChatGPT Plus (GPT-4)",
    icon: Brain,
    desc: "Advanced AI access for professional workflows, research assistance, and content generation.",
    users: ["Samad"],
    color: "from-[hsl(265_60%_55%)] to-[hsl(150_60%_45%)]",
  },
  {
    name: "More Tools & Software",
    icon: Sparkles,
    desc: "Custom software setup, tool licensing, and tech support at affordable rates for students and professionals.",
    users: ["Available for all clients"],
    color: "from-[hsl(265_60%_55%)] to-[hsl(40_80%_55%)]",
  },
];

const PremiumTools = () => {
  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-accent -right-36 top-10" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Premium <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
            Providing top-tier software access at affordable rates. Every service comes verified.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 100}>
              <div className="glass-card-3d p-6 h-full flex flex-col group relative overflow-hidden">
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm bg-gradient-to-br ${tool.color}`} />
                <div className="absolute inset-[1px] rounded-xl bg-card/90 -z-10" />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <tool.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 flex-1">{tool.desc}</p>
                <div className="space-y-1.5">
                  {tool.users.map((user) => (
                    <div key={user} className="flex items-center gap-1.5 text-[11px] text-foreground/80">
                      <BadgeCheck size={12} className="text-primary shrink-0" />
                      <span>Verified: {user}</span>
                    </div>
                  ))}
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
