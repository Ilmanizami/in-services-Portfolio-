import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string; title: string; description: string; image_url: string | null;
  live_link: string | null; github_link: string | null; tech_stack: string[];
};

const ProjectsSection = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,description,image_url,live_link,github_link,tech_stack")
        .eq("is_published", true)
        .order("sort_order");
      if (error) throw error;
      return data as Project[];
    },
  });

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

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card-3d p-6 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 80} direction={i % 2 === 0 ? "up" : "scale"}>
                <div className="glass-card-3d p-6 flex flex-col hover:border-primary/50 group h-full">
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Github size={14} /> GitHub <ExternalLink size={12} />
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        Live <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
