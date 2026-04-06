import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Phone, Calendar, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Open mailto with pre-filled data
    const mailtoLink = `mailto:ilmanizami2k23@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Hi Ilma,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\nReply to: ${formData.email}`)}`;
    window.open(mailtoLink, "_blank");
    toast.success("Opening your email client! You can also reach me via WhatsApp.");
    setSending(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="floating-orb w-96 h-96 bg-primary -right-48 bottom-0" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          Let's <span className="text-gradient">Work Together</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Looking for affordable, professional services? Drop me a message and let's connect!
        </p>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="glass-card-3d p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">Send a Message</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <a href="mailto:ilmanizami2k23@gmail.com" className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">ilmanizami2k23@gmail.com</p>
              </div>
            </a>

            <a href="https://wa.me/923243564150" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">WhatsApp / Phone</p>
                <p className="text-xs text-muted-foreground">03243564150</p>
              </div>
            </a>

            <a href="https://calendly.com/ilmanizami2k23/30min" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Book a Meeting</p>
                <p className="text-xs text-muted-foreground">Schedule a 30-min call on Calendly</p>
              </div>
            </a>

            <a href="https://github.com/Ilmanizami" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">GitHub</p>
                <p className="text-xs text-muted-foreground">github.com/Ilmanizami</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/ilmanizami/" target="_blank" rel="noopener noreferrer" className="glass-card-3d p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Linkedin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">LinkedIn</p>
                <p className="text-xs text-muted-foreground">2,481 followers · 500+ connections</p>
              </div>
            </a>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-xs text-muted-foreground">Karachi, Sindh, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-16 text-center">© 2026 Ilma Nizami — IN Services. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactSection;
