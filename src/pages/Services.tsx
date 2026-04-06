import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Palette, Video, Film, Code, Briefcase, FileText, Wrench, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Logos, branding, social media graphics, posters, banners & more. Eye-catching visuals that elevate your brand.",
    features: ["Logo & Brand Identity", "Social Media Graphics", "Marketing Materials", "UI/UX Design"],
  },
  {
    icon: Video,
    title: "Video Editing",
    desc: "Professional video editing for YouTube, ads, corporate videos, and personal projects with seamless transitions.",
    features: ["YouTube Videos", "Promotional Ads", "Corporate Content", "Color Grading"],
  },
  {
    icon: Film,
    title: "Reel Animation",
    desc: "Engaging Instagram and TikTok reel animations that boost engagement and captivate your audience.",
    features: ["Instagram Reels", "TikTok Content", "Motion Graphics", "Animated Stories"],
  },
  {
    icon: Code,
    title: "Web Development",
    desc: "Full-stack web development with modern technologies. From landing pages to complex web applications.",
    features: ["React / TypeScript", "Full-Stack Apps", "Landing Pages", "API Integration"],
  },
  {
    icon: Briefcase,
    title: "Project Management",
    desc: "End-to-end project management for tech and creative projects. Ensuring deadlines, quality, and communication.",
    features: ["Agile Workflow", "Team Coordination", "Deadline Management", "Quality Assurance"],
  },
  {
    icon: FileText,
    title: "FYP Panaflex & Posters",
    desc: "Complete panaflex service for final year project students — I analyze your report, design the panaflex, and deliver it on location.",
    features: ["Report Analysis", "Professional Design", "Print Production", "On-Site Delivery"],
  },
  {
    icon: Wrench,
    title: "Tools & Solutions",
    desc: "All the tools and software solutions you need at affordable rates. From design tools to development environments.",
    features: ["Software Setup", "Tool Licensing", "Tech Support", "Affordable Rates"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-gradient">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Professional services at affordable rates for local & international clients. Whether you need design, development, or end-to-end project management — I've got you covered.
          </p>
          <p className="text-sm text-primary font-medium">80+ happy clients and counting</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="glass-card p-8 hover:border-primary/50 transition-all group flex flex-col">
                <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Get Started?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Drop me a message with your requirements and I'll get back to you with a quote. Affordable rates guaranteed.
            </p>
            <a
              href="mailto:ilmanizami2k23@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
