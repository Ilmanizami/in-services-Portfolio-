import { MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  return (
    <a
      href="https://wa.me/923243564150"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start a Project on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white shadow-[0_0_30px_hsl(150_65%_45%/0.5)] hover:shadow-[0_0_50px_hsl(150_65%_45%/0.7)] transition-all hover:scale-105 animate-pulse-glow"
      style={{
        background: "linear-gradient(135deg, hsl(150 65% 42%), hsl(160 70% 45%))",
      }}
    >
      <MessageCircle size={18} />
      Start a Project
    </a>
  );
};

export default FloatingCTA;
