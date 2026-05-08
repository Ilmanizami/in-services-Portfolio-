import { Download } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollAnimation";

const CatalogBanner = () => {
  return (
    <section id="catalog" className="py-16 relative scroll-mt-24">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-[hsl(0_0%_5%)] p-8 md:p-12 text-center">
            {/* Purple glow */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
                Download Our Full Service Catalog
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                Explore our complete range of Graphic, Video, and Printing services in one PDF.
              </p>

              <a
                href="https://vyqeuvnldgecooxxuidh.supabase.co/storage/v1/object/public/brochures/catalog.pdf"
                download="IN_Services_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                type="application/pdf"
                className="group mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_hsl(150_100%_45%/0.6),0_0_0_2px_hsl(150_100%_45%/0.8)]"
                style={{ willChange: "transform" }}
              >
                <Download size={18} />
                DOWNLOAD PDF
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CatalogBanner;
