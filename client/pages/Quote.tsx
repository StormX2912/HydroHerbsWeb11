import { useEffect, useState, useRef } from "react";

interface QuoteDecoration {
  src: string;
  alt: string;
  width: string;
  opacity?: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  transform?: string;
  delay?: string;
  maxWidth?: string;
  zIndex?: number;
}

const QUOTE_DECORATIONS: QuoteDecoration[] = [
  // Add your decorations here - same structure as Products decorations
  // Example:
  // {
  //   src: "...",
  //   alt: "Decoration",
  //   width: "w-36 md:w-52 lg:w-72 xl:w-88",
  //   opacity: "opacity-90",
  //   top: "50px",
  //   left: "50px",
  //   transform: "rotate(0deg)",
  //   delay: "0s",
  // },
];

export default function Quote() {
  const [opacity, setOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calculateOpacity = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section enters viewport
      // Start fading in earlier - when section top is at 150% of viewport height
      const fadeStart = windowHeight * 1.5;
      const fadeEnd = windowHeight * 0.2;
      
      // Calculate progress (0 to 1)
      let progress = 0;
      if (rect.top < fadeStart && rect.top > fadeEnd) {
        // Fading in
        progress = 1 - (rect.top - fadeEnd) / (fadeStart - fadeEnd);
      } else if (rect.top <= fadeEnd) {
        // Fully visible
        progress = 1;
      }
      
      // Apply easing for smooth fade
      progress = Math.max(0, Math.min(1, progress));
      const easedProgress = progress * progress; // Quadratic easing
      
      setOpacity(easedProgress);
      // Text fades in slightly after blur
      setTextOpacity(Math.max(0, easedProgress - 0.1));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateOpacity);
    };

    // Initial calculation
    calculateOpacity();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
          <section ref={sectionRef} className="relative w-full overflow-hidden md:overflow-visible flex items-center justify-center pt-[400px] pb-[400px] px-4 sm:px-6" style={{ backgroundColor: '#fff7e3', marginBottom: '-1px' }}>
      {/* Blur effect background */}
      <div
        className="absolute w-full max-w-[350px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] aspect-square rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: "#C2FF65",
          filter: "blur(100px)",
          top: "clamp(80px, 12vh, 150px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
          opacity: opacity * 0.2, // 0.2 is the max opacity (20%)
        }}
      />

      {/* Decorations */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-visible">
        {QUOTE_DECORATIONS.map((decoration, idx) => (
          <img
            key={idx}
            src={decoration.src}
            alt={decoration.alt}
            loading="lazy"
            className={`absolute ${decoration.width} ${decoration.opacity || ''} aspect-square object-contain hidden md:block`}
            style={{
              aspectRatio: "1 / 1",
              ...(decoration.top && {
                top: decoration.top.includes('%') || decoration.top.includes('clamp')
                  ? decoration.top
                  : decoration.top.includes('-')
                    ? `max(${decoration.top}, -100vh)`
                    : `min(${decoration.top}, 200vh)`
              }),
              ...(decoration.bottom && {
                bottom: decoration.bottom.includes('%') || decoration.bottom.includes('clamp')
                  ? decoration.bottom
                  : decoration.bottom.includes('-')
                    ? `max(${decoration.bottom}, -100vh)`
                    : `min(${decoration.bottom}, 200vh)`
              }),
              ...(decoration.left && {
                left: decoration.left.includes('%') || decoration.left.includes('clamp')
                  ? decoration.left
                  : decoration.left.includes('-')
                    ? `max(${decoration.left}, -100vw)`
                    : `min(${decoration.left}, 200vw)`
              }),
              ...(decoration.right && {
                right: decoration.right.includes('%') || decoration.right.includes('clamp')
                  ? decoration.right
                  : decoration.right.includes('-')
                    ? `max(${decoration.right}, -100vw)`
                    : `min(${decoration.right}, 200vw)`
              }),
              ...(decoration.maxWidth && {
                maxWidth: decoration.maxWidth,
              }),
              ...(decoration.zIndex && {
                zIndex: decoration.zIndex,
              }),
              transform: decoration.transform || "",
            }}
          />
        ))}
      </div>

      {/* Text container */}
      <div className="relative z-10 max-w-[970px] mx-auto text-center px-4">
        <blockquote className="space-y-4 sm:space-y-6">
            <p 
              className="font-akatab font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] leading-tight text-[#2A1515] px-4 sm:px-6 md:px-0 md:ml-[59px] transition-opacity duration-500"
              style={{ opacity: textOpacity * 0.7 }}
            >
            "If you are cold, tea will warm you, if you are too heated, it will
            cool you, If you are depressed, it will cheer you and If you are
            excited, it will calm you."
          </p>
          <cite 
            className="block font-akatab font-normal text-sm sm:text-base md:text-lg lg:text-[20px] text-[#2A1515] not-italic transition-opacity duration-500"
            style={{ opacity: textOpacity * 0.7 }}
          >
            ― William Ewart Gladstone
          </cite>
        </blockquote>
      </div>
    </section>
  );
}