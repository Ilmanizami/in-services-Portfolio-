import { Code, Palette, Video, Users, Briefcase, Monitor } from "lucide-react";

const skills = [
  { icon: Palette, label: "Graphic Design" },
  { icon: Video, label: "Video Editing" },
  { icon: Monitor, label: "Reel Animation" },
  { icon: Code, label: "Development" },
  { icon: Briefcase, label: "Project Management" },
  { icon: Users, label: "Client Relations" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          CS Finalist & Tech Project Manager at Phinnovate Tech. I specialize in AI engineering, cybersecurity research, and building intelligent systems — while delivering creative design and development services to clients worldwide.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.label} className="glass-card p-6 text-center hover:border-primary/50 transition-all group">
              <skill.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-foreground">{skill.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { num: "80+", label: "Clients Served" },
            { num: "6+", label: "Services" },
            { num: "100+", label: "Projects Done" },
            { num: "Local & Intl", label: "Reach" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-gradient">{stat.num}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
