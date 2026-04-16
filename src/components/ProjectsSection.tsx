import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const projects = [
  { title: "MindStream", desc: "AI assistant built with Gemini for extreme cognitive offloading. Transforms chaotic text into prioritized, structured tasks using advanced NLP.", tech: ["TypeScript", "AI", "Gemini"], github: "https://github.com/Ilmanizami/MindStream" },
  { title: "Scientific Calculator Compiler", desc: "A scientific calculator built using JFlex and CUP for the Compiler Construction course.", tech: ["Java", "JFlex", "CUP"], github: "https://github.com/Ilmanizami/Scientific-Calculator-Compiler" },
  { title: "Optigraph Timetable Optimizer", desc: "Automated timetable scheduling system using graph-based optimization algorithms.", tech: ["Python", "Algorithms"], github: "https://github.com/Ilmanizami/Optigraph-Timetable-Optimizer" },
  { title: "Spotify Recommendation System", desc: "Predicts a user's likelihood of replaying a song within 30 days by analyzing listening history.", tech: ["Python", "ML", "Data Science"], github: "https://github.com/Ilmanizami/Spotify-Recommendation-System" },
  { title: "AES Side-Channel Attack (FYP)", desc: "Final Year Project: AI-based analysis of AES Side-Channel Attacks using deep learning, TensorFlow, and neural networks for hardware security research.", tech: ["AI", "TensorFlow", "Security", "DLSCA"] },
  { title: "Panaflex & Design Services", desc: "Professional panaflex, poster, and branding designs for FYP students and businesses — end-to-end from analysis to on-location delivery.", tech: ["Design", "Print", "Branding"] },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-secondary/20 relative">
      <div className="floating-orb w-64 h-64 bg-accent right-0 top-10" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            A mix of technical builds, AI research, and creative work.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 80} direction={i % 2 === 0 ? "up" : "scale"}>
              <div className="glass-card-3d p-6 flex flex-col hover:border-primary/50 group h-full">
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{t}</span>
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

export default ProjectsSection;
