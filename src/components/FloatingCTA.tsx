import { MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  return (
    <a
      href="https://wa.me/923243564150"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Start a Project on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-primary-foreground bg-primary shadow-[0_0_30px_hsl(280_100%_58%/0.6)] hover:shadow-[0_0_50px_hsl(280_100%_58%/0.85)] transition-all hover:scale-105 animate-pulse-glow"
    >
      <MessageCircle size={18} />
      Start a Project
    </a>
  );
};

export default FloatingCTA;
