import { Briefcase, GraduationCap, Award } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const experiences = [
  { role: "Visual Animator", company: "MicroNex PAK", type: "Internship", period: "Mar 2026 - Present", location: "Sindh, Pakistan", desc: "Motion sequencing, pacing, kinetic typography, and visual animation for brand content." },
  { role: "AI Artist", company: "RedverseAI", type: "Internship", period: "Feb 2026 - Mar 2026", location: "Remote", desc: "Created ultra-realistic digital images and videos for product launches using generative AI, prompt engineering, and tools like Google Veo & CapCut Pro." },
  { role: "Graphic Designer", company: "She's Beyond (Non-Profit)", type: "Volunteer", period: "Jun 2025 - Dec 2025", location: "Remote", desc: "Media team member creating visually compelling content, event banners, social media posts, and promotional materials for women empowerment campaigns." },
  { role: "Video Content Creator", company: "Inventiv Technology", type: "Internship", period: "Aug 2025 - Oct 2025", location: "Remote (US-based)", desc: "Produced engaging reels and video content supporting the social media marketing team, enhancing brand visibility and audience engagement." },
  { role: "Director — IEEE (DSB)", company: "DAWOOD UET", type: "Full-time", period: "Jan 2022 - Dec 2024", location: "Sindh, Pakistan", desc: "Led information mediation, marketing, graphic design, video editing, and event management. Hosted IEEE events and volunteered in university orientations." },
  { role: "Social Media & Project Manager", company: "Quick Byte Innovation", type: "Part-time", period: "Jan 2024 - May 2024", location: "Karachi, Pakistan", desc: "Managed social media strategy and project coordination for the organization." },
];

const education = [
  { degree: "Bachelor's in Computer Science", school: "Dawood University of Engineering & Technology", period: "Oct 2022 – Oct 2026", grade: "Grade: A", desc: "Specializing in AI & Cybersecurity. Active in IEEE, volunteering, event hosting, and recognized by VC Dr. Samreen." },
  { degree: "SOC Analyst Course", school: "NED University of Engineering & Technology", period: "Aug 2023 – Oct 2023", desc: "Mastered cybersecurity fundamentals, SIEM tools, incident response, threat intelligence, and vulnerability assessment." },
];

const certifications = [
  "Adobe Illustrator for Beginners — Coursera",
  "Project Tracker with Airtable — Coursera",
  "Mobile App Interface with Moqups — Coursera",
  "Microsoft Excel — Coursera",
  "Basic SQL Syntax — Coursera",
  "Digital Advertising — United Latino Students Association",
  "Social Media Marketing with Canva — ULSA",
  "E-Commerce Skills — Mind Luster",
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-secondary/20 relative">
      <div className="floating-orb w-72 h-72 bg-primary -left-36 top-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient">Experience</span> & Education
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            A journey through internships, leadership roles, and continuous learning.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div>
            <ScrollReveal direction="left">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Work Experience</h3>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <ScrollReveal key={i} delay={i * 80} direction="left">
                  <div className="glass-card-3d p-5 relative">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{exp.role}</h4>
                        <p className="text-primary text-xs font-medium">{exp.company} · {exp.type}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal direction="right">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Education</h3>
              </div>
            </ScrollReveal>
            <div className="space-y-4 mb-8">
              {education.map((edu, i) => (
                <ScrollReveal key={i} delay={i * 100} direction="right">
                  <div className="glass-card-3d p-5">
                    <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                    <p className="text-primary text-xs font-medium">{edu.school}</p>
                    <p className="text-xs text-muted-foreground">{edu.period} {edu.grade && `· ${edu.grade}`}</p>
                    <p className="text-xs text-muted-foreground mt-2">{edu.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="right" delay={200}>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Certifications</h3>
              </div>
              <div className="glass-card p-5">
                <ul className="space-y-2">
                  {certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5">✦</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
