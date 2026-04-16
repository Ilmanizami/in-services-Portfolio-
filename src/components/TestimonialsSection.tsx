import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Ayaz Hussain",
    role: "2D Character Client",
    rating: 5,
    text: "The 2D characters were exactly what I needed after my previous project failed elsewhere. Highly recommended for creative recovery!",
  },
  {
    name: "Ali",
    role: "3D Animation Client",
    rating: 5,
    text: "Amazing 3D animation skills on Blender. Highly professional and efficient work. The cinematic logo reveal was beyond expectations.",
  },
  {
    name: "Sarah Khalid",
    role: "Wedding Client",
    rating: 5,
    text: "The level of customization provided for our wedding envelopes was unmatched. The emerald and gold finish was exactly what we envisioned for our royal theme!",
  },
  {
    name: "Ayesha Rehman",
    role: "Wedding Client",
    rating: 5,
    text: "The animated wedding invite was a huge hit! It was elegant, creative, and saved us so much time with digital distribution.",
  },
  {
    name: "Ahmed Khan",
    role: "FYP Student — DUET",
    rating: 5,
    text: "Ilma designed our FYP panaflex and poster from scratch after analyzing our report. The quality was outstanding and delivered right to our location.",
  },
  {
    name: "Content Lead",
    role: "YouTube Thumbnail Client",
    rating: 5,
    text: "Handled our bulk thumbnail requirements with perfect organization and timing. Great to work with for high-volume creative needs.",
  },
  {
    name: "Fatima Raza",
    role: "Wedding Client — Karachi",
    rating: 5,
    text: "The animated wedding card and event props were absolutely beautiful. Everyone at the event asked who designed them. Will definitely recommend IN Services!",
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
    rating: 5,
    text: "Professional video editing for our product reels. The AI-generated product photography was impressive — saved us thousands on a real photoshoot.",
  },
  {
    name: "Hira Noor",
    role: "Content Creator",
    rating: 5,
    text: "My Instagram reels went from average to viral quality. The motion graphics and kinetic typography made a huge difference. 10/10 service!",
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
