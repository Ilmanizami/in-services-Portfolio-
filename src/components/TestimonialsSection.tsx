import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  name: string;
  country: string;
  service: string;
  rating: number;
  text: string;
};

const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("client_name,country,service_provided,rating,feedback_text")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((t): Testimonial => ({
        name: t.client_name,
        country: t.country ?? "",
        service: t.service_provided,
        rating: t.rating,
        text: t.feedback_text,
      }));
    },
  });

const useVisibleCount = () => {
  const [n, setN] = useState(1);
  useEffect(() => {
    const update = () => setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
};

const StarRow = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, s) => (
      <Star
        key={s}
        size={15}
        className={s < rating ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="oval-glow h-full rounded-3xl p-6 md:p-7 text-center bg-white/[0.04] backdrop-blur-[15px] border border-white/10 transition-transform duration-500 hover:-translate-y-1"
  >
    <Quote className="w-8 h-8 text-primary/50 mx-auto mb-3" />
    <p className="text-sm text-foreground/90 leading-relaxed mb-4 min-h-[88px]">"{t.text}"</p>
    <StarRow rating={t.rating} />
    <p className="font-display font-semibold text-foreground">{t.name}</p>
    <p className="text-xs text-primary/90">{t.service} · <span className="text-muted-foreground">{t.country}</span></p>
  </div>
);

const TestimonialsSection = () => {
  const visible = useVisibleCount();
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const { data: testimonials = [] } = useTestimonials();

  const len = testimonials.length;

  const next = useCallback(() => setStart((s) => (s + 1) % len), [len]);
  const prev = useCallback(() => setStart((s) => (s - 1 + len) % len), [len]);

  useEffect(() => {
    if (paused || openAll) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [paused, openAll, next]);

  // touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    };
    const el = document.getElementById("testimonial-track");
    el?.addEventListener("touchstart", onStart);
    el?.addEventListener("touchend", onEnd);
    return () => {
      el?.removeEventListener("touchstart", onStart);
      el?.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  const visibleItems = len === 0
    ? []
    : Array.from({ length: Math.min(visible, len) }).map((_, i) => testimonials[(start + i) % len]);
  const pageCount = Math.max(1, len - visible + 1);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="floating-orb w-72 h-72 bg-primary -left-36 bottom-10" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-sm md:text-base">
            Trusted by 80+ clients across Pakistan, the US, UK, Canada, India, Saudi Arabia & beyond.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* arrows */}
            <button
              onClick={prev}
              aria-label="Previous reviews"
              className="oval-glow hidden md:flex absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-background/60 backdrop-blur-md hover:bg-primary/20 transition-all"
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>
            <button
              onClick={next}
              aria-label="Next reviews"
              className="oval-glow hidden md:flex absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-background/60 backdrop-blur-md hover:bg-primary/20 transition-all"
            >
              <ChevronRight size={20} className="text-primary" />
            </button>

            {/* track */}
            <div id="testimonial-track" className="grid gap-5 sm:gap-6" style={{ gridTemplateColumns: `repeat(${visible}, minmax(0, 1fr))` }}>
              {visibleItems.map((t, i) => (
                <div key={`${t.name}-${i}`} className="animate-fade-up">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>

            {/* dots */}
            <div className="flex items-center justify-center gap-1.5 mt-8">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStart(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === start ? "bg-primary w-8 shadow-[0_0_10px_hsl(280_100%_70%/0.7)]" : "bg-muted-foreground/30 w-2 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            {/* mobile arrows */}
            <div className="flex md:hidden items-center justify-center gap-3 mt-4">
              <button onClick={prev} aria-label="Previous" className="oval-glow w-10 h-10 rounded-full bg-background/60 backdrop-blur-md flex items-center justify-center">
                <ChevronLeft size={18} className="text-primary" />
              </button>
              <button onClick={next} aria-label="Next" className="oval-glow w-10 h-10 rounded-full bg-background/60 backdrop-blur-md flex items-center justify-center">
                <ChevronRight size={18} className="text-primary" />
              </button>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setOpenAll(true)}
                className="oval-glow inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/15 backdrop-blur-md text-foreground text-sm font-semibold hover:bg-primary/25 transition-all"
              >
                View All {len} Reviews
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      {openAll && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-up"
          onClick={() => setOpenAll(false)}
        >
          <div
            className="oval-glow relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-background/90 backdrop-blur-xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-background/90 backdrop-blur-xl py-2 z-10">
              <h3 className="font-display text-xl md:text-2xl font-bold">
                All <span className="text-gradient">Client Reviews</span>
              </h3>
              <button
                onClick={() => setOpenAll(false)}
                aria-label="Close"
                className="oval-glow w-9 h-9 rounded-full flex items-center justify-center bg-background/60 hover:bg-primary/20 transition-all"
              >
                <X size={18} className="text-primary" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
