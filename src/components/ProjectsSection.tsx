import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, PlayCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  live_link: string | null;
  project_url: string | null;
  github_link: string | null;
  tech_stack: string[];
  category: string | null;
  project_type: "image" | "video";
};

const GOLD = "45 100% 60%";
const PURPLE = "280 100% 70%";

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

const VideoEmbed = ({ url, poster }: { url: string; poster?: string | null }) => {
  const embed = getEmbedUrl(url);
  if (embed) {
    return (
      <iframe
        src={embed}
        title="Project video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <video
      src={url}
      poster={poster ?? undefined}
      controls
      playsInline
      className="w-full h-full object-cover bg-black"
    />
  );
};

const ProjectsSection = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", "v2"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id,title,description,image_url,thumbnail_url,video_url,live_link,project_url,github_link,tech_stack,category,project_type"
        )
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/70 text-center max-w-xl mx-auto mb-16">
            A dynamic showcase of premium builds, motion reels, and creative work.
          </p>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-card/60 p-6 h-72 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const isVideo = project.project_type === "video" && project.video_url;
              const cover =
                project.thumbnail_url ||
                project.image_url ||
                null;
              const liveHref = project.live_link || project.project_url;

              return (
                <ScrollReveal key={project.id} delay={i * 80}>
                  <div
                    className="group rounded-2xl overflow-hidden flex flex-col h-full bg-[hsl(265_50%_8%/0.7)] backdrop-blur border border-white/10 transition-all duration-300 hover:border-[hsl(45_100%_60%/0.6)]"
                    style={{
                      transform: "none",
                      boxShadow: `0 8px 28px hsl(280 80% 8% / 0.4)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px hsl(${GOLD} / 0.35), 0 8px 28px hsl(280 80% 8% / 0.5)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 28px hsl(280 80% 8% / 0.4)`;
                    }}
                  >
                    <div className="relative aspect-video w-full bg-black/60 overflow-hidden">
                      {isVideo ? (
                        <VideoEmbed url={project.video_url!} poster={cover} />
                      ) : cover ? (
                        <img
                          src={cover}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, hsl(${PURPLE} / 0.25), hsl(280 80% 10%))`,
                          }}
                        >
                          <PlayCircle size={48} className="text-white/40" />
                        </div>
                      )}
                      {project.category && (
                        <span
                          className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded-full font-semibold"
                          style={{
                            background: `hsl(${GOLD} / 0.15)`,
                            color: `hsl(${GOLD})`,
                            border: `1px solid hsl(${GOLD} / 0.4)`,
                          }}
                        >
                          {project.category}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-[hsl(45_100%_70%)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/75 mb-4 flex-1">{project.description}</p>
                      {project.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech_stack.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-1 rounded-full text-white/90 border"
                              style={{
                                background: `hsl(${PURPLE} / 0.15)`,
                                borderColor: `hsl(${PURPLE} / 0.35)`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4 mt-auto">
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors"
                          >
                            <Github size={14} /> GitHub
                          </a>
                        )}
                        {liveHref && (
                          <a
                            href={liveHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                            style={{ color: `hsl(${GOLD})` }}
                          >
                            Live <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
