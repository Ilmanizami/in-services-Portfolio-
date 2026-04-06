import { Code, Palette, Video, Users, Briefcase, Monitor, Shield, Brain, Wrench, GraduationCap } from "lucide-react";

const skills = [
  { icon: Palette, label: "Graphic Design" },
  { icon: Video, label: "Video Editing" },
  { icon: Monitor, label: "Reel Animation" },
  { icon: Code, label: "Development" },
  { icon: Briefcase, label: "Project Management" },
  { icon: Brain, label: "AI & ML" },
  { icon: Shield, label: "Cybersecurity" },
  { icon: Wrench, label: "Tools Provider" },
  { icon: Users, label: "Client Relations" },
  { icon: GraduationCap, label: "Tutoring" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="floating-orb w-80 h-80 bg-accent -right-40 top-0" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-muted-foreground text-center">
            I am a <span className="text-foreground font-medium">Final-Year Computer Science student</span> at Dawood University (DUET'26), specializing in <span className="text-foreground font-medium">Artificial Intelligence</span> and <span className="text-foreground font-medium">Cybersecurity</span>. My journey blends technical engineering with creative entrepreneurship.
          </p>
          <p className="text-muted-foreground text-center text-sm">
            My primary research focuses on analyzing <span className="text-primary font-medium">AES Side-Channel Attacks using Deep Learning</span> — exploring how Neural Networks can identify security vulnerabilities in encryption by analyzing physical data patterns, bridging hardware security and advanced Machine Learning.
          </p>
          <p className="text-muted-foreground text-center text-sm">
            Through <span className="text-foreground font-medium">Phinnovate Tech</span>, I offer digital solutions across diverse niches including design, development, branding, video editing, and academic tutoring. My mission is to grow into a high-impact AI Engineer while delivering creative excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 perspective-container">
          {skills.map((skill, i) => (
            <div
              key={skill.label}
              className="glass-card-3d p-5 text-center hover:border-primary/50 group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <skill.icon className="w-7 h-7 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-foreground">{skill.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "80+", label: "Clients Served" },
            { num: "6+", label: "Services" },
            { num: "100+", label: "Projects Done" },
            { num: "2,481", label: "LinkedIn Followers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-card p-6">
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
