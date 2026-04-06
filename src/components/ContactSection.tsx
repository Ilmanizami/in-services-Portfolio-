import { Mail, Github, Linkedin, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Let's <span className="text-gradient">Work Together</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">
          Looking for affordable, professional services? I'm just a message away.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <a href="mailto:ilmanizami2k23@gmail.com" className="glass-card p-6 hover:border-primary/50 transition-all group">
            <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Email</p>
          </a>
          <a href="https://github.com/Ilmanizami" target="_blank" rel="noopener noreferrer" className="glass-card p-6 hover:border-primary/50 transition-all group">
            <Github className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">GitHub</p>
          </a>
          <a href="https://www.linkedin.com/in/ilmanizami/" target="_blank" rel="noopener noreferrer" className="glass-card p-6 hover:border-primary/50 transition-all group">
            <Linkedin className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">LinkedIn</p>
          </a>
          <div className="glass-card p-6">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Pakistan</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-12">© 2026 Ilma Nizami. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactSection;
