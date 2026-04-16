import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { ExternalLink, X, Palette, Video, Film, PenTool, FileText, Sparkles } from "lucide-react";

const categories = ["All", "Graphic Design", "Video Editing", "Reel Animation", "2D Art", "Panaflex", "AI Art"] as const;
type Category = (typeof categories)[number];

const galleryItems = [
  { title: "Brand Identity — Tech Startup", category: "Graphic Design" as Category, desc: "Complete branding package with logo, business cards, and social media kit.", color: "from-violet-600/20 to-purple-800/20" },
  { title: "Product Launch Reel", category: "Video Editing" as Category, desc: "Professional product launch video with color grading and motion graphics.", color: "from-blue-600/20 to-cyan-800/20" },
  { title: "Instagram Reel — Food Brand", category: "Reel Animation" as Category, desc: "Kinetic typography and motion sequencing for a food delivery brand.", color: "from-orange-600/20 to-red-800/20" },
  { title: "2D Character — Game Asset", category: "2D Art" as Category, desc: "Custom 2D character design and sprite sheets for a mobile game.", color: "from-green-600/20 to-emerald-800/20" },
  { title: "FYP Panaflex — AI Project", category: "Panaflex" as Category, desc: "Professional panaflex designed from FYP report analysis, printed and delivered on-site.", color: "from-pink-600/20 to-rose-800/20" },
  { title: "AI Product Photography", category: "AI Art" as Category, desc: "Ultra-realistic product shots generated using AI tools for e-commerce brand.", color: "from-amber-600/20 to-yellow-800/20" },
  { title: "Wedding Invitation Card", category: "Graphic Design" as Category, desc: "Animated digital wedding card with elegant typography and gold accents.", color: "from-violet-600/20 to-purple-800/20" },
  { title: "Corporate Event Highlights", category: "Video Editing" as Category, desc: "Event highlights video with smooth transitions, voiceover sync, and branding.", color: "from-blue-600/20 to-cyan-800/20" },
  { title: "TikTok Content Series", category: "Reel Animation" as Category, desc: "Series of 15-second animated clips with motion graphics for a fashion brand.", color: "from-orange-600/20 to-red-800/20" },
  { title: "Children's Book Illustration", category: "2D Art" as Category, desc: "Full illustration set for a children's storybook with vibrant characters.", color: "from-green-600/20 to-emerald-800/20" },
  { title: "FYP Poster — Cybersecurity", category: "Panaflex" as Category, desc: "Academic poster for a cybersecurity research project, delivered to DUET campus.", color: "from-pink-600/20 to-rose-800/20" },
  { title: "AI Fashion Model Campaign", category: "AI Art" as Category, desc: "AI-generated fashion models and product interaction visuals for brand ads.", color: "from-amber-600/20 to-yellow-800/20" },
];

const iconMap: Record<string, React.ElementType> = {
  "Graphic Design": Palette,
  "Video Editing": Video,
  "Reel Animation": Film,
  "2D Art": PenTool,
  "Panaflex": FileText,
  "AI Art": Sparkles,
};

const Gallery = () => {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8 relative">
        <div className="floating-orb w-96 h-96 bg-accent -left-48 top-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              Portfolio <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              A showcase of my design work, video editing, animations, panaflex projects, and AI art across 80+ client projects.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    active === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {filtered.map((item, i) => {
              const Icon = iconMap[item.category] || Palette;
              return (
                <ScrollReveal key={`${item.title}-${active}`} delay={i * 60}>
                  <div
                    onClick={() => setSelected(item)}
                    className="glass-card-3d overflow-hidden cursor-pointer group hover:border-primary/50"
                  >
                    <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                      <Icon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-all group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <span className="absolute bottom-3 left-4 text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Lightbox modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-4" onClick={() => setSelected(null)}>
          <div className="glass-card-3d max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
            <div className={`h-40 rounded-lg bg-gradient-to-br ${selected.color} flex items-center justify-center mb-6`}>
              {(() => { const Icon = iconMap[selected.category] || Palette; return <Icon className="w-16 h-16 text-primary/50" />; })()}
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-3 inline-block">{selected.category}</span>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{selected.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{selected.desc}</p>
            <a
              href="mailto:ilmanizami2k23@gmail.com?subject=Inquiry about: ${selected.title}"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Inquire about this project <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
