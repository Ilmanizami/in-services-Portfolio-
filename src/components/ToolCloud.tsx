import { ScrollReveal } from "@/hooks/useScrollAnimation";

type Tool = { name: string; color: string; letter: string };

// SVG-based brand icons (lightweight, no extra deps). Each renders inside a circular badge.
const tools: Tool[] = [
  { name: "Blender", color: "#F5792A", letter: "B" },
  { name: "Autodesk Maya", color: "#0696D7", letter: "M" },
  { name: "Google Veo 3", color: "#4285F4", letter: "V" },
  { name: "Photoshop", color: "#31A8FF", letter: "Ps" },
  { name: "Illustrator", color: "#FF9A00", letter: "Ai" },
  { name: "Figma", color: "#A259FF", letter: "F" },
  { name: "Ideogram", color: "#FF4F8B", letter: "Id" },
  { name: "Freepik", color: "#1273EB", letter: "Fp" },
  { name: "GitHub", color: "#FFFFFF", letter: "Gh" },
  { name: "VS Code", color: "#007ACC", letter: "Vs" },
  { name: "Docker", color: "#2496ED", letter: "Dk" },
  { name: "Slack", color: "#E01E5A", letter: "Sl" },
  { name: "Canva", color: "#00C4CC", letter: "Cv" },
  { name: "CapCut Pro", color: "#000000", letter: "Cc" },
  { name: "ChatGPT", color: "#10A37F", letter: "AI" },
];

const ToolCloud = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-primary -left-48 top-10" />
      <div className="floating-orb w-72 h-72 bg-accent -right-36 bottom-10" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-center mb-3">
            The Creative <span className="text-gradient-gold">Core Engine</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-sm md:text-base">
            A floating constellation of the tools that power every IN-SERVICES delivery — from Blender 3D to Veo 3 AI video.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.name} delay={i * 40} direction="scale">
              <div className="group flex flex-col items-center gap-2">
                <div
                  className="tool-icon-magnetic w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-border/40 relative animate-float"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${tool.color}33, hsl(232 40% 12% / 0.8))`,
                    animationDelay: `${(i % 6) * 0.4}s`,
                    animationDuration: `${6 + (i % 4)}s`,
                  }}
                >
                  <span
                    className="font-bold text-xl md:text-2xl"
                    style={{
                      color: tool.color === "#000000" ? "#fff" : tool.color,
                      textShadow: `0 0 12px ${tool.color}99`,
                    }}
                  >
                    {tool.letter}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-[hsl(42_75%_65%)] transition-colors text-center font-medium">
                  {tool.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <p className="text-center text-xs text-muted-foreground mt-12 italic">
            Hover any tool to see it lift — every icon represents a real, production-grade workflow used in delivered client projects.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ToolCloud;
