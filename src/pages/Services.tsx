import Navbar from "@/components/Navbar";
import {
  Palette, Video, Film, Code, Briefcase, FileText, Wrench, ArrowRight, CheckCircle,
  PenTool, Image, Layers, Type, Heart, Sparkles, BookOpen, Monitor
} from "lucide-react";

const serviceCategories = [
  {
    title: "Graphic Designing",
    icon: Palette,
    services: [
      "Brand Identity Design", "Logo Design", "Business Card Design", "Letterhead",
      "Marketing Materials", "Flyers & Pamphlets", "Posters & Banners",
      "Stickers & Labels", "Social Media Posts", "Thumbnails & Banners",
      "Catalog & Booklet Designing", "CV & Resume Design",
      "Menu Design", "Portfolio Design", "Certificates",
      "Presentation Design", "Social Media Story Templates",
    ],
  },
  {
    title: "Video Editing",
    icon: Video,
    services: [
      "Social Media Reels Editing", "Event Highlights Video",
      "Voiceover-Based Reels/Videos", "Branding Reels",
      "YouTube Videos", "Promotional Ads", "Corporate Content", "Color Grading",
    ],
  },
  {
    title: "Reel Animation",
    icon: Film,
    services: [
      "Instagram Reels", "TikTok Content", "Motion Graphics",
      "Animated Stories", "Kinetic Typography",
    ],
  },
  {
    title: "2D Art & Illustration",
    icon: PenTool,
    services: [
      "2D Character Designing", "Illustration & Digital Art",
      "Mascot & Cartoon Art", "Children's Book Illustrations",
      "Music Cover Art", "2D Sprite Sheets",
    ],
  },
  {
    title: "Wedding & Events",
    icon: Heart,
    services: [
      "Wedding Props", "Animated Wedding Cards",
      "Wedding Certificates", "Invitation Cards", "Event Banners",
    ],
  },
  {
    title: "Web Development",
    icon: Code,
    services: [
      "React / TypeScript", "Full-Stack Apps", "Landing Pages",
      "API Integration", "Portfolio Sites", "UI/UX Design",
    ],
  },
  {
    title: "Project Management",
    icon: Briefcase,
    services: [
      "Agile Workflow", "Team Coordination", "Deadline Management",
      "Quality Assurance", "SQL-Based DB Projects",
    ],
  },
  {
    title: "FYP Panaflex & Posters",
    icon: FileText,
    services: [
      "Report Analysis", "Professional Panaflex Design", "Print Production",
      "On-Site Delivery", "Academic Posters",
    ],
  },
  {
    title: "Academic & Tutoring",
    icon: BookOpen,
    services: [
      "Programming Fundamentals", "SQL & Databases", "Java & OOP",
      "DSA", "Software Engineering", "Final Year Projects",
      "MATLAB Assignments", "General Assignments",
    ],
  },
  {
    title: "Tools & Solutions",
    icon: Wrench,
    services: [
      "Software Setup", "Tool Licensing", "Tech Support",
      "Affordable Rates", "Assignment & Projects Support",
    ],
  },
  {
    title: "AI Art & Content",
    icon: Sparkles,
    services: [
      "Generative AI Visual Design", "AI Product Photography",
      "AI Video Production", "Prompt Engineering",
      "Ultra-Realistic Digital Images",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 relative">
        <div className="floating-orb w-96 h-96 bg-primary -right-48 top-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            IN <span className="text-gradient">Services</span>
          </h1>
          <p className="text-sm text-primary font-medium mb-4">Where Design Meets Visual Creativity</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Professional services at affordable rates for local & international clients. From graphic design to AI art, development, and end-to-end project management — I've got you covered.
          </p>
          <p className="text-sm text-muted-foreground">80+ happy clients and counting</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {serviceCategories.map((cat) => (
              <div key={cat.title} className="glass-card-3d p-7 hover:border-primary/50 flex flex-col group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{cat.title}</h3>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {cat.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground/80">
                      <CheckCircle size={12} className="text-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card-3d p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Get Started?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Drop me a message with your requirements. Affordable rates guaranteed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:ilmanizami2k23@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                Email Me <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/923243564150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-all hover:scale-105"
              >
                WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
