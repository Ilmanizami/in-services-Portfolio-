import { Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const faqs = [
  { q: "What is the typical project timeline?", a: "Strictly tailored to project complexity to ensure high-fidelity results." },
  { q: "What is the Payment Process?", a: "30–40% upfront deposit is mandatory. Balance is due upon completion." },
  { q: "What is the Revision Policy?", a: "3–4 free revisions per deal. Extra revisions require a new slot payment." },
  { q: "Do you handle Urgent Projects?", a: "Yes, with a 10–20% urgency fee for 24–48 hour delivery." },
  { q: "How do Digital Tool Subscriptions work?", a: "Instant access granted right after payment confirmation." },
  { q: "What is your Refund Policy?", a: "Strictly No-Refund Policy once the project commences." },
  { q: "What are the Communication Channels?", a: "Email, WhatsApp, LinkedIn, and Fiverr for official tracking." },
];

const GOLD = "45 100% 60%";
const GOLD_SOFT = "45 100% 70%";
const PURPLE_DEEP = "267 65% 11%"; // ~#1A0B2E
const PURPLE_VIBRANT = "271 81% 56%"; // ~#9333EA

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 relative scroll-mt-24">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p
              className="text-xs uppercase tracking-[0.3em] font-semibold mb-3"
              style={{ color: `hsl(${GOLD})` }}
            >
              Agency Policies
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              IN-SERVICES:{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(135deg, hsl(${GOLD}), hsl(${GOLD_SOFT}))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Policies & FAQ
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 max-w-6xl mx-auto items-start">
          <ScrollReveal>
            <div
              className="rounded-2xl border p-2 md:p-4 backdrop-blur"
              style={{
                borderColor: `hsl(${PURPLE_VIBRANT} / 0.5)`,
                background: `linear-gradient(180deg, hsl(${PURPLE_DEEP} / 0.85), hsl(0 0% 5% / 0.85))`,
                boxShadow: `0 0 30px hsl(${PURPLE_VIBRANT} / 0.25)`,
              }}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-b last:border-b-0"
                    style={{ borderColor: `hsl(${PURPLE_VIBRANT} / 0.25)` }}
                  >
                    <AccordionTrigger
                      className="px-4 text-left font-semibold hover:no-underline"
                      style={{ color: `hsl(${GOLD_SOFT})` }}
                    >
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-sm text-foreground/85 leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>

          {/* Luxury Brochure Card — purple glass + gold glow */}
          <ScrollReveal delay={150}>
            <div
              className="rounded-2xl p-6 text-center flex flex-col items-center gap-4 sticky top-24 backdrop-blur-xl"
              style={{
                background: `linear-gradient(160deg, hsl(${PURPLE_DEEP} / 0.85), hsl(0 0% 4% / 0.85))`,
                border: `1px solid hsl(${GOLD} / 0.7)`,
                boxShadow: `0 0 40px hsl(${GOLD} / 0.35), inset 0 0 24px hsl(${PURPLE_VIBRANT} / 0.18)`,
              }}
            >
              <h3 className="font-display text-xl font-bold" style={{ color: `hsl(${GOLD_SOFT})` }}>
                Luxury Service Brochure
              </h3>
              <p className="text-xs text-foreground/70">
                All 13 services, partnerships & policies — in one PDF.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = "/catalog.pdf";
                  link.download = "IN-SERVICES_Luxury_Brochure.pdf";
                  link.rel = "noopener noreferrer";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-extrabold tracking-wide transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(135deg, hsl(${GOLD}), hsl(38 100% 50%))`,
                  color: "#000",
                  boxShadow: `0 0 28px hsl(${GOLD} / 0.75), 0 0 0 1px hsl(${GOLD_SOFT} / 0.7)`,
                }}
              >
                <Download size={18} />
                DOWNLOAD BROCHURE
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
