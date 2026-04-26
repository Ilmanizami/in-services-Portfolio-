import * as React from "react";

export const useScrollAnimation = (threshold = 0.15) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, className = "", delay = 0, direction = "up" }, forwardedRef) => {
    const { ref, isVisible } = useScrollAnimation(0.1);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        ref.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef, ref]
    );

    const directionStyles: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
      up: "translate-y-12",
      left: "-translate-x-12",
      right: "translate-x-12",
      scale: "scale-90",
    };

    return (
      <div
        ref={setRefs}
        className={`transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : `opacity-0 ${directionStyles[direction]}`
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

