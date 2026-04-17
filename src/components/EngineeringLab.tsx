import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { Cpu, Sparkles } from "lucide-react";

type Tool = { name: string; logo: string; alt?: string };

// High-quality CDN logos (SVG) for real brand identity
const engineeringTools: Tool[] = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Keras", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
  { name: "Java (OOP)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MATLAB", logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" },
  { name: "JFlex & CUP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Neo4j", logo: "https://dist.neo4j.com/wp-content/uploads/20210422202428/neo4j-logo-2020-1.svg" },
  { name: "HTML & CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Google Colab", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" },
];

const creativeTools: Tool[] = [
  { name: "Google Veo 3.1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Blender", logo: "https://download.blender.org/branding/community/blender_community_badge_white.svg" },
  { name: "Autodesk Maya", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Autodesk_Logo.svg" },
  { name: "CapCut Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/CapCut_logo.svg" },
  { name: "Adobe Illustrator", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { name: "Adobe Photoshop", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Photoshop Express", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Premiere Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { name: "After Effects", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Adobe_After_Effects_CC_icon.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Canva Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" },
  { name: "Ideogram", logo: "https://ideogram.ai/assets/image/balanced/response/B5ALCSn4SzaFxnJTd7f3qg" },
  { name: "Photopea", logo: "https://www.photopea.com/promo/icon512.png" },
];

const ToolBadge = ({ tool }: { tool: Tool }) => (
  <div className="group flex flex-col items-center gap-2">
    <div className="tool-icon-magnetic w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-card/80 backdrop-blur-xl border border-border/50 hover:border-primary/60 p-3">
      <img
        src={tool.logo}
        alt={tool.name}
        loading="lazy"
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const parent = e.currentTarget.parentElement;
          if (parent && !parent.querySelector(".fallback")) {
            const span = document.createElement("span");
            span.className = "fallback text-xs font-bold text-primary";
            span.textContent = tool.name.slice(0, 2).toUpperCase();
            parent.appendChild(span);
          }
        }}
      />
    </div>
    <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-primary transition-colors text-center font-medium leading-tight">
      {tool.name}
    </span>
  </div>
);

const EngineeringLab = () => {
  return (
    <section id="engineering-lab" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-96 h-96 bg-primary -left-48 top-10" />
      <div className="floating-orb w-72 h-72 bg-accent -right-36 bottom-10" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
            The Engine Behind the <span className="text-gradient">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
            From research-grade ML stacks to cinema-grade creative suites — every IN-SERVICES delivery is built on production-tested tools.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — Engineering & Research */}
          <ScrollReveal direction="left">
            <div className="glass-card-3d p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground">Engineering & Research</h3>
                  <p className="text-xs text-muted-foreground">AI, Compilers, Data & Systems</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {engineeringTools.map((t) => (
                  <ToolBadge key={t.name} tool={t} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — Creative & AI Media */}
          <ScrollReveal direction="right">
            <div className="glass-card-3d p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground">Creative & AI Media</h3>
                  <p className="text-xs text-muted-foreground">3D, Motion, Design & Generative AI</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {creativeTools.map((t) => (
                  <ToolBadge key={t.name} tool={t} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default EngineeringLab;
