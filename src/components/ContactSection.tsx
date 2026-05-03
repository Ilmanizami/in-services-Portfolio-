import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Github, Linkedin, MapPin, Phone, Calendar, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

// Identity is hardcoded and locked — these values cannot be overridden by the database.
const LOCKED_EMAIL = "ilmanizami2k23@gmail.com";
const LOCKED_PHONE = "03243564150";
const LOCKED_WHATSAPP = "923243564150";
const FALLBACK = {
  calendly_url: "https://calendly.com/ilmanizami2k23/30min",
  github_url: "https://github.com/Ilmanizami",
  linkedin_url: "https://www.linkedin.com/in/ilmanizami/",
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
      return data;
    },
  });

  const s = {
    contact_email: LOCKED_EMAIL,
    contact_phone: LOCKED_PHONE,
    whatsapp_number: LOCKED_WHATSAPP,
    calendly_url: settings?.calendly_url || FALLBACK.calendly_url,
    github_url: settings?.github_url || FALLBACK.github_url,
    linkedin_url: settings?.linkedin_url || FALLBACK.linkedin_url,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const mailtoLink = `mailto:${s.contact_email}?subject=${encodeURIComponent(formData.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Hi Ilma,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\nReply to: ${formData.email}`)}`;
    window.open(mailtoLink, "_blank");
    toast.success("Opening your email client! You can also reach me via WhatsApp.");
    setSending(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const items = [
    { href: `mailto:${s.contact_email}`, icon: Mail, title: "Email", sub: s.contact_email },
    { href: `https://wa.me/${s.whatsapp_number.replace(/\D/g, "")}`, icon: Phone, title: "WhatsApp / Phone", sub: s.contact_phone, external: true },
    { href: s.calendly_url, icon: Calendar, title: "Book a Meeting", sub: "Schedule a 30-min call on Calendly", external: true },
    { href: s.github_url, icon: Github, title: "GitHub", sub: s.github_url.replace(/^https?:\/\//, ""), external: true },
    { href: s.linkedin_url, icon: Linkedin, title: "LinkedIn", sub: "2,481 followers · 500+ connections", external: true },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="floating-orb w-96 h-96 bg-primary -right-48 bottom-0" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Looking for affordable, professional services? Drop me a message and let's connect!
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="glass-card-3d p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">Send a Message</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Your Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Your Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" placeholder="Project Inquiry" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Message</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell me about your project..." />
                </div>
                <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-4">
              {items.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80} direction="right">
                  <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all block">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={400} direction="right">
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-xs text-muted-foreground">Karachi, Sindh, Pakistan</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        <p className="text-muted-foreground text-sm mt-16 text-center">© 2026 Ilma Nizami — IN Services. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactSection;
