import { useState } from "react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { ExternalLink, Github, BadgeCheck, Layers, Palette, Film, Heart, FileText, PenTool } from "lucide-react";

type Category = "all" | "3d-motion" | "character-art" | "branding" | "print" | "stationary" | "web";

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All Works", icon: Layers },
  { key: "3d-motion", label: "3D & Motion", icon: Film },
  { key: "character-art", label: "Character Art", icon: PenTool },
  { key: "branding", label: "Corporate Branding", icon: Palette },
  { key: "print", label: "Print Media", icon: FileText },
  { key: "stationary", label: "Events & Stationary", icon: Heart },
  { key: "web", label: "Web & Management", icon: ExternalLink },
];

const projects = [
  {
    cat: "3d-motion" as Category,
    title: "Cinematic 3D Logo Reveal",
    client: "Ali",
    desc: "Crafted a high-impact 3D logo animation in Blender with cinematic lighting and smooth motion transitions.",
    tags: ["Blender", "3D", "Motion"],
    featured: true,
  },
  {
    cat: "3d-motion" as Category,
    title: "High-Retention Motion Graphics",
    client: "Kaif",
    desc: "Designed and rendered professional logo animation in Blender, enhancing brand visibility through dynamic motion.",
    tags: ["Blender", "Animation", "Logo"],
  },
  {
    cat: "character-art" as Category,
    title: "2D Character Recovery & Redesign",
    client: "Ayaz Hussain",
    desc: "Successfully restored and developed two custom 2D character illustrations after a previous service failure, ensuring brand consistency and quality.",
    tags: ["2D Art", "Recovery", "Illustration"],
    featured: true,
  },
  {
    cat: "character-art" as Category,
    title: "Bespoke 2D Character Design",
    client: "Seerat",
    desc: "Created custom 2D character assets focusing on unique personality traits and versatile art styles.",
    tags: ["2D Art", "Character", "Digital"],
  },
  {
    cat: "branding" as Category,
    title: "Full Brand Ecosystem",
    client: "Pizza Planet",
    desc: "Executed complete brand identity overhaul: logo, digital menus, marketing banners, and custom QR code integration.",
    tags: ["Branding", "Logo", "Menu", "QR"],
    featured: true,
  },
  {
    cat: "branding" as Category,
    title: "Strategic Brand Lead",
    client: "Ahmed Qadri",
    desc: "End-to-end design for Software House branding, personal projects, high-quality logos, thumbnails, banners, and brochures.",
    tags: ["Branding", "Thumbnails", "Retainer"],
  },
  {
    cat: "branding" as Category,
    title: "Social Media Strategy & Design",
    client: "Tariq Bakery",
    desc: "Curated and designed engaging social media posts to boost digital presence and customer interaction.",
    tags: ["Social Media", "Posts", "Strategy"],
  },
  {
    cat: "branding" as Category,
    title: "Minimalist Brand Identity",
    client: "Hiba Sheikh",
    desc: "Crafted a minimalist and elegant logo for marriage bureau, reflecting trust and premium service.",
    tags: ["Logo", "Minimalist", "Branding"],
  },
  {
    cat: "branding" as Category,
    title: "Commercial Brochure Design",
    client: "Janshir Ali",
    desc: "Designed comprehensive commercial brochure for retail shop to effectively showcase product range.",
    tags: ["Brochure", "Print", "Retail"],
  },
  {
    cat: "print" as Category,
    title: "Large-Scale Panaflex Designs",
    client: "DUET & KU Students",
    desc: "Designed and delivered large-scale Panaflex banners for Khadeejah Nizam (DUET), Hooria Arshid (DUET), and University of Karachi clients.",
    tags: ["Panaflex", "Print", "Academic"],
    featured: true,
  },
  {
    cat: "stationary" as Category,
    title: "Animated Digital Wedding Invites",
    client: "Wedding Clients",
    desc: "Created luxury animated digital wedding invitations, printable cards, and bespoke branded envelopes with emerald and gold finishes.",
    tags: ["Wedding", "Animation", "Print"],
  },
  {
    cat: "stationary" as Category,
    title: "Intricate Family Tree Design",
    client: "Mustafa",
    desc: "Designing a customized Family Tree with detailed layout and historical aesthetics.",
    tags: ["Design", "Custom", "Art"],
  },
  {
    cat: "stationary" as Category,
    title: "ATS-Optimized Resume Engineering",
    client: "Mehak, Khadeejah, Sana",
    desc: "Crafted professional ATS-friendly CVs for Mehak Ehsan, Khadeejah Nizam, and Sana Imran, tailored to specific career requirements.",
    tags: ["Resume", "CV", "ATS"],
  },
  {
    cat: "web" as Category,
    title: "Full-Stack Portfolio Development",
    client: "Ameen Uddin Ahmed",
    desc: "Developed and deployed a sleek, responsive web-based portfolio using modern web technologies.",
    tags: ["React", "TypeScript", "UI/UX"],
    github: "https://github.com/Ilmanizami",
    featured: true,
  },
  {
    cat: "web" as Category,
    title: "Creative Pipeline Management",
    client: "Multiple Clients",
    desc: "Managed creative pipeline for 15+ high-CTR YouTube thumbnails and 6+ major freelance design/video projects from concept to delivery.",
    tags: ["Management", "YouTube", "Freelance"],
  },
];

const CreativePortfolio = () => {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="projects" className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-accent -right-40 top-20" />
      <div className="floating-orb w-64 h-64 bg-primary -left-32 bottom-20" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Creative <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            A curated collection of 80+ projects spanning 3D animation, character art, corporate branding, print media, and web development.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  active === cat.key
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(265_60%_55%/0.3)]"
                    : "glass-card text-muted-foreground hover:text-primary hover:border-primary/30"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.title + project.client} delay={i * 60} direction={i % 2 === 0 ? "up" : "scale"}>
              <div className={`glass-card-3d p-6 flex flex-col h-full group relative ${project.featured ? "border-primary/30" : ""}`}>
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-medium text-primary flex items-center gap-1">
                    <BadgeCheck size={10} /> Featured
                  </div>
                )}
                <p className="text-[10px] uppercase tracking-widest text-primary/60 mb-1 font-medium">
                  {categories.find((c) => c.key === project.cat)?.label}
                </p>
                <h3 className="font-display text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-primary/80 font-medium mb-3">Client: {project.client}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Github size={14} /> View on GitHub <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativePortfolio;
