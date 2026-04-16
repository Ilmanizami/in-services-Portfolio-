import { MessageCircle } from "lucide-react";

const FloatingCTA = () => {
  return (
    <a
      href="https://wa.me/923243564150"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-[0_0_30px_hsl(150_60%_40%/0.3)] hover:shadow-[0_0_40px_hsl(150_60%_40%/0.5)] transition-all hover:scale-105"
      style={{
        background: "linear-gradient(135deg, hsl(150 60% 38%), hsl(160 70% 42%))",
        color: "white",
      }}
    >
      <MessageCircle size={18} />
      Start a Project
    </a>
  );
};

export default FloatingCTA;
