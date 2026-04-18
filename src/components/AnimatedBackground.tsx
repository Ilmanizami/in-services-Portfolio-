import { useEffect, useState } from "react";
import { Box, Cpu, PlayCircle, PenTool, Sparkles, Zap } from "lucide-react";

type FloatIcon = {
  Icon: typeof Box;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

const ICONS: FloatIcon[] = [
  { Icon: Box,        top: "8%",  left: "6%",  size: 56, delay: 0,   duration: 14, drift: 30 },
  { Icon: Cpu,        top: "22%", left: "82%", size: 64, delay: 2,   duration: 18, drift: 40 },
  { Icon: PlayCircle, top: "46%", left: "12%", size: 60, delay: 4,   duration: 16, drift: 25 },
  { Icon: PenTool,    top: "62%", left: "78%", size: 52, delay: 1,   duration: 20, drift: 35 },
  { Icon: Sparkles,   top: "78%", left: "20%", size: 48, delay: 3,   duration: 15, drift: 28 },
  { Icon: Zap,        top: "14%", left: "48%", size: 44, delay: 5,   duration: 17, drift: 32 },
  { Icon: Box,        top: "88%", left: "60%", size: 50, delay: 2.5, duration: 19, drift: 36 },
  { Icon: Cpu,        top: "40%", left: "46%", size: 42, delay: 6,   duration: 22, drift: 24 },
  { Icon: PlayCircle, top: "70%", left: "92%", size: 46, delay: 1.5, duration: 16, drift: 30 },
  { Icon: PenTool,    top: "30%", left: "28%", size: 40, delay: 4.5, duration: 18, drift: 26 },
];

const AnimatedBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Wireframe grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(280 100% 58% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(280 100% 58% / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translate3d(${mouse.x * -10}px, ${mouse.y * -10}px, 0)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Floating icons */}
      {ICONS.map((it, idx) => {
        const Icon = it.Icon;
        return (
          <div
            key={idx}
            className="absolute"
            style={{
              top: it.top,
              left: it.left,
              transform: `translate3d(${mouse.x * it.drift * 0.4}px, ${mouse.y * it.drift * 0.4}px, 0)`,
              transition: "transform 0.6s ease-out",
            }}
          >
            <div
              style={{
                animation: `floatDrift ${it.duration}s ease-in-out ${it.delay}s infinite, spinSlow ${it.duration * 1.6}s linear infinite`,
                filter: "drop-shadow(0 0 18px hsl(280 100% 58% / 0.55))",
                opacity: 0.18,
                color: "hsl(280 100% 70%)",
              }}
            >
              <Icon size={it.size} strokeWidth={1.25} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes floatDrift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-24px) translateX(12px); }
          50% { transform: translateY(-8px) translateX(-14px); }
          75% { transform: translateY(18px) translateX(8px); }
        }
        @keyframes spinSlow {
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
