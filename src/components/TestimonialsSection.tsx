import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "FYP Student — DUET",
    rating: 5,
    text: "Ilma designed our FYP panaflex and poster from scratch after analyzing our report. The quality was outstanding and delivered right to our location. Highly professional!",
  },
  {
    name: "Sarah Mitchell",
    role: "Brand Owner — US",
    rating: 5,
    text: "The branding package was beyond expectations. Logo, social media templates, and promo videos — all delivered ahead of schedule at incredibly affordable rates.",
  },
  {
    name: "Fatima Raza",
    role: "Wedding Client — Karachi",
    rating: 5,
    text: "The animated wedding card and event props were absolutely beautiful. Everyone at the event asked who designed them. Will definitely recommend IN Services!",
  },
  {
    name: "Muhammad Ali",
    role: "Startup Founder",
    rating: 5,
    text: "Got our entire brand identity done — logo, website, and marketing materials. The 3D animations for our product launch reel were next level.",
  },
  {
    name: "Zainab Hussain",
    role: "CS Student — DUET",
    rating: 5,
    text: "Ilma helped me with my Java OOP project and SQL assignments. Clear explanations and delivered before the deadline. A lifesaver for students!",
  },
  {
    name: "David Chen",
    role: "E-commerce Owner — UK",
    rating: 4,
    text: "Professional video editing for our product reels. The AI-generated product photography was impressive — saved us thousands on a real photoshoot.",
  },
  {
    name: "Hira Noor",
    role: "Content Creator",
    rating: 5,
    text: "My Instagram reels went from average to viral quality. The motion graphics and kinetic typography made a huge difference. 10/10 service!",
  },
  {
    name: "Usman Tariq",
    role: "Business Client — Lahore",
    rating: 5,
    text: "Affordable tools setup and tech support. Ilma also managed our social media for 3 months. Very responsive and professional throughout.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -left-36 bottom-10" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            Trusted by 80+ clients locally & internationally. Here's what they say.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 perspective-container">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <div className="glass-card-3d p-6 h-full flex flex-col hover:border-primary/50 group">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-xs text-muted-foreground flex-1 mb-4 leading-relaxed">{t.text}</p>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={12}
                      className={s < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-primary/80">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
