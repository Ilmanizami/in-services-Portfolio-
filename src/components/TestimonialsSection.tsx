import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Ayaz Hussain",
    role: "2D Character Client",
    rating: 5,
    text: "Mera project kharab ho chuka tha, lekin inhone recovery ke baad impeccable quality 2D characters banaye. Quality is 10/10.",
  },
  {
    name: "Ali",
    role: "3D Animation Client",
    rating: 5,
    text: "Exceptional 3D Blender animation work. Professional and prompt delivery — the cinematic logo reveal exceeded my expectations.",
  },
  {
    name: "Tanzila Rohail",
    role: "Influencer · CapCut Pro Client",
    rating: 5,
    text: "Highly reliable service for professional-grade editing tools and support. Made my content production seamless.",
  },
  {
    name: "Sarah Khalid",
    role: "Wedding Client",
    rating: 5,
    text: "The customized wedding envelopes and animated cards made our event truly royal. Every detail was perfect — emerald and gold finish was exactly what we envisioned!",
  },
  {
    name: "Ayesha Rehman",
    role: "Wedding Client",
    rating: 5,
    text: "The animated wedding invite was a huge hit! Elegant, creative, and saved us so much time with digital distribution.",
  },
  {
    name: "Khadeejah Nizam",
    role: "FYP Student — DUET",
    rating: 5,
    text: "Ilma analyzed my FYP report and designed a stunning panaflex from scratch — delivered right to my location. Highly professional service.",
  },
  {
    name: "Ahmed Qadri",
    role: "Software House — Retainer",
    rating: 5,
    text: "Ongoing creative partner for our software house branding, thumbnails, and brochures. Consistently high quality and reliable turnaround.",
  },
  {
    name: "Pizza Planet",
    role: "Brand Identity Client",
    rating: 5,
    text: "Complete brand overhaul — logo, digital menus, banners, and QR integration. Our customers love the new look!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -left-36 bottom-10" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Client <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
            Trusted by 80+ clients locally & internationally. Here's what they say.
          </p>
        </ScrollReveal>

        {/* Featured carousel */}
        <ScrollReveal delay={100}>
          <div
            className="max-w-2xl mx-auto mb-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="glass-card-3d p-8 md:p-10 text-center relative">
              <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6 min-h-[80px]">
                "{testimonials[current].text}"
              </p>
              <div className="flex justify-center gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s < testimonials[current].rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                  />
                ))}
              </div>
              <p className="font-display font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-xs text-primary/80">{testimonials[current].role}</p>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={prev} className="p-2 rounded-full glass-card hover:bg-primary/10 transition-colors">
                  <ChevronLeft size={18} className="text-muted-foreground" />
                </button>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="p-2 rounded-full glass-card hover:bg-primary/10 transition-colors">
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mini grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 perspective-container">
          {testimonials.slice(0, 4).map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <div className="glass-card-3d p-5 h-full flex flex-col hover:border-primary/50 group">
                <Quote className="w-5 h-5 text-primary/30 mb-2" />
                <p className="text-xs text-muted-foreground flex-1 mb-3 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={10} className={s < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] text-primary/80">{t.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
