import { useState } from "react";
import { z } from "zod";
import confetti from "canvas-confetti";
import { GraduationCap, HeartHandshake, Briefcase, Handshake, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type RoleType = "Internship" | "Volunteership" | "Paid Project" | "Partnership";

const tracks: { type: RoleType; title: string; desc: string; Icon: typeof GraduationCap }[] = [
  { type: "Internship", title: "Internship", desc: "Hands-on training in design, video, automation & project delivery. Mentorship from the founder, real client exposure, certificate on completion.", Icon: GraduationCap },
  { type: "Volunteership", title: "Volunteership", desc: "Community-driven roles: university outreach, content campaigns, event support. Flexible hours, recognition & portfolio credits.", Icon: HeartHandshake },
  { type: "Paid Project", title: "Paid Projects", desc: "Freelance & contract work for experienced creators — designers, editors, developers, automation specialists. Fair payouts per milestone.", Icon: Briefcase },
  { type: "Partnership", title: "Partnerships & Collaborations", desc: "For established professionals, creators, or agencies looking to collaborate on high-end projects.", Icon: Handshake },
];

const schema = z.object({
  full_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  skills: z.string().trim().min(1).max(1000),
  portfolio_link: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const Careers = () => {
  const [role, setRole] = useState<RoleType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      skills: fd.get("skills"),
      portfolio_link: fd.get("portfolio_link") || "",
      message: fd.get("message") || "",
    });
    if (!parsed.success) {
      toast.error("Please check your inputs.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("applications").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      role_type: role,
      skills: parsed.data.skills,
      portfolio_link: parsed.data.portfolio_link || null,
      message: parsed.data.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Submission failed. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Welcome to the Empire! Your application has been secured.");

    // Confetti cannon
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        colors: ["#FFD700", "#10b981", "#a855f7", "#ffffff"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Mailto draft to ops inbox
    setTimeout(() => {
      const subject = encodeURIComponent(`New ${role} Application — IN-SERVICES`);
      const body = encodeURIComponent(
        `New application received via IN-SERVICES portal.\n\n` +
          `Track: ${role}\n` +
          `Name: ${parsed.data.full_name}\n` +
          `Email: ${parsed.data.email}\n` +
          `Portfolio: ${parsed.data.portfolio_link || "—"}\n\n` +
          `Skills:\n${parsed.data.skills}\n\n` +
          `Message:\n${parsed.data.message || "—"}\n`
      );
      window.location.href = `mailto:freelancingbyin@gmail.com?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <div className="min-h-screen digital-aura relative w-full max-w-[100vw] overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Careers</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Join the <span className="text-gradient">IN-SERVICES</span> Empire
            </h1>
            <p className="text-muted-foreground">
              We're scaling a multi-vertical agency. Pick a track and apply — we review every submission.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 max-w-6xl mx-auto">
          {tracks.map((t, i) => (
            <ScrollReveal key={t.type} delay={i * 100}>
              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:border-[hsl(45_100%_60%/0.6)] hover:shadow-[0_0_30px_hsl(45_100%_60%/0.35)]" style={{ transform: "none" }}>
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <t.Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 mb-5">{t.desc}</p>
                <Button
                  onClick={() => {
                    setRole(t.type);
                    setSubmitted(false);
                    setTimeout(() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" }), 50);
                  }}
                  className="w-full"
                  variant={role === t.type ? "default" : "secondary"}
                >
                  Apply for {t.title}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div id="apply-form" className="max-w-2xl mx-auto scroll-mt-24">
          <ScrollReveal>
            <div
              className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:border-[hsl(45_100%_60%/0.6)] hover:shadow-[0_0_30px_hsl(45_100%_60%/0.35)]"
              style={{ transform: "none" }}
            >
              <h2 className="font-display text-2xl font-bold mb-1">
                {role ? `Apply: ${role}` : "Select a track to begin"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {role ? "Fill in your details below. We'll review and reach out." : "Pick Internship, Volunteership, Paid Projects, or Partnerships above."}
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <p className="font-display text-lg text-primary mb-2">Application received ✨</p>
                  <p className="text-sm text-muted-foreground">Thank you for applying. Our team will review your portfolio and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input id="full_name" name="full_name" required maxLength={100} disabled={!role} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" required maxLength={255} disabled={!role} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="skills">Skills / Expertise *</Label>
                    <Textarea id="skills" name="skills" required maxLength={1000} placeholder="e.g. After Effects, 3D modeling, n8n automation, React" disabled={!role} />
                  </div>
                  <div>
                    <Label htmlFor="portfolio_link">Portfolio / LinkedIn Link</Label>
                    <Input id="portfolio_link" name="portfolio_link" type="url" maxLength={500} placeholder="https://..." disabled={!role} />
                  </div>
                  <div>
                    <Label htmlFor="message">Why join us?</Label>
                    <Textarea id="message" name="message" maxLength={2000} placeholder="Tell us about your goals (optional)" disabled={!role} />
                  </div>
                  <Button type="submit" disabled={!role || submitting} className="w-full">
                    {submitting ? <><Loader2 className="animate-spin mr-2" size={16} /> Submitting…</> : "Submit Application"}
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
