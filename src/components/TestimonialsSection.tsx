import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Himansh",
    role: "Professional Pulse · Data Entry Client",
    rating: 5,
    text: "Highly professional data entry and precise execution. Delivered before the deadline.",
  },
  {
    name: "MindStream AI Client",
    role: "Technical · AI Implementation",
    rating: 5,
    text: "A game-changing AI implementation that optimized our entire cognitive workflow.",
  },
  {
    name: "Ayaz Hussain",
    role: "2D Characters Client",
    rating: 5,
    text: "Outstanding recovery work; the quality is unmatched.",
  },
  {
    name: "Ali",
    role: "3D Animation Client",
    rating: 5,
    text: "Cinematic precision and excellent motion sequencing.",
  },
  {
    name: "Tanzila Rohail",
    role: "Influencer · CapCut Pro Client",
    rating: 5,
    text: "Perfect execution for high-impact social media content.",
  },
  {
    name: "Sarah K.",
    role: "Stationery / Wedding Client",
    rating: 5,
    text: "Animated wedding cards added a royal, premium touch!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const getOffset = (i: number) => {
    const len = testimonials.length;
    let diff = i - current;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -left-36 bottom-10" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 text-sm md:text-base">
            Trusted by 80+ clients locally & internationally — across creative, technical, and academic projects.
          </p>
        </ScrollReveal>

        {/* 3D perspective slider */}
        <ScrollReveal delay={100}>
          <div
            className="relative max-w-4xl mx-auto h-[420px] md:h-[380px] flex items-center justify-center"
            style={{ perspective: "1400px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {testimonials.map((t, i) => {
              const offset = getOffset(i);
              const abs = Math.abs(offset);
              const isActive = offset === 0;
              const visible = abs <= 2;

              const translateX = offset * 180;
              const translateZ = -abs * 220;
              const rotateY = offset * -22;
              const opacity = visible ? (isActive ? 1 : 0.55 - abs * 0.15) : 0;
              const zIndex = 10 - abs;

              return (
                <div
                  key={t.name}
                  className="absolute w-[88%] sm:w-[460px] transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    pointerEvents: isActive ? "auto" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`glass-card p-7 md:p-9 text-center border ${
                      isActive
                        ? "border-primary/60 shadow-[0_0_40px_hsl(280_100%_58%/0.45)]"
                        : "border-border/40"
                    }`}
                  >
                    <Quote className="w-9 h-9 text-primary/30 mx-auto mb-4" />
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-5 min-h-[96px]">
                      "{t.text}"
                    </p>
                    <div className="flex justify-center gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={15}
                          className={s < t.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                        />
                      ))}
                    </div>
                    <p className="font-display font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-primary/80">{t.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2.5 rounded-full glass-card border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all"
            >
              <ChevronLeft size={18} className="text-primary" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-8 shadow-[0_0_10px_hsl(280_100%_58%/0.6)]" : "bg-muted-foreground/30 w-2"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next review"
              className="p-2.5 rounded-full glass-card border border-primary/40 hover:bg-primary/10 hover:border-primary transition-all"
            >
              <ChevronRight size={18} className="text-primary" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
