import { useState, useEffect, useRef } from "react";

interface OurStoryDecoration {
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
  parallaxRotation?: number; // Maximum rotation in degrees
  parallaxDelay?: number; // Delay before parallax starts (0-1, where 0.3 means starts at 30% progress)
}

const OUR_STORY_DECORATIONS: OurStoryDecoration[] = [
  {
    src: "/teapot.png",
    alt: "Tea decoration - top right",
    width: "w-[183px] md:w-[263px] lg:w-[364px] xl:w-[446px]",
    top: "-800px",
    right: "100px",
    transform: "",
    delay: "0s",
    parallaxRotation: -50, // Increased rotation speed
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/da4b020f057bdd53b01f55f7e6273ebdb86d5680?width=468",
    alt: "Tea leaves decoration - top left",
    width: "w-[119px] md:w-[149px] lg:w-[178px] xl:w-[207px]",
    top: "-10px",
    left: "895px",
    transform: "rotate(-7.375deg)",
    delay: "0s",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/8c2cca88a8dcfa37d83880b83442d45b32b22b1b?width=511",
    alt: "Tea leaves decoration - bottom right",
    width: "w-[162px] md:w-[202px] lg:w-[242px] xl:w-[282px]",
    bottom: "280px",
    right: "-90px", // Changed from "-205px" to "50px" to make it visible
    transform: "rotate(10deg)",
    delay: "0s",
    parallaxRotation: -30, // Rotate 30 degrees left with parallax
    parallaxDelay: 0.3, // Start parallax later (at 30% of scroll progress)
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2Fa4587839481b46c5a2a9f56ab2fc6cfe%2F184be882a9af4d8291f0dca765535f92",
    alt: "Large teacup image - left side",
    width: "w-[718px] md:w-[897px] lg:w-[1076px] xl:w-[1400px] 2xl:w-[1679px]",
    left: "-730px",
    bottom: "-100px",
    transform: "",
    delay: "0s",
    parallaxRotation: -90, // Increased rotation for more movement
    parallaxDelay: 0.15, // Start parallax earlier (at 15% of scroll progress)
  },
];

export default function OurStory() {
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calculateRotations = () => {
      if (!sectionRef.current) return;

      // Find Quote section - get previous section
      const allSections = Array.from(document.querySelectorAll('section'));
      const ourStoryIndex = allSections.indexOf(sectionRef.current);
      const quoteSection = ourStoryIndex > 0 ? allSections[ourStoryIndex - 1] as HTMLElement : null;
      
      if (!quoteSection) {
        setRotations({});
        return;
      }

      const windowHeight = window.innerHeight;
      const quoteRect = quoteSection.getBoundingClientRect();
      const quoteTop = quoteRect.top;
      const quoteHeight = quoteRect.height;
      
      // Start parallax earlier - when Quote section is further from viewport
      // Start when Quote section top is at 85% of viewport height
      const parallaxStart = windowHeight * 0.85;
      const parallaxEnd = windowHeight * -0.5; // End when Quote section top is 50% above viewport
      
      // Calculate progress - parallax starts later
      let scrollProgress = 0;
      if (quoteTop < parallaxStart && quoteTop > parallaxEnd) {
        // Parallax is active
        scrollProgress = 1 - (quoteTop - parallaxEnd) / (parallaxStart - parallaxEnd);
      } else if (quoteTop <= parallaxEnd) {
        // Parallax complete
        scrollProgress = 1;
      }
      
      // Clamp progress between 0 and 1
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Apply easing for smoother but faster rotation
      scrollProgress = scrollProgress * scrollProgress; // Quadratic for faster initial rotation
      
      // Calculate rotations for each decoration
      const newRotations: Record<number, number> = {};
      OUR_STORY_DECORATIONS.forEach((decoration, idx) => {
        if (decoration.parallaxRotation !== undefined) {
          // Apply parallax delay if specified
          let adjustedProgress = scrollProgress;
          if (decoration.parallaxDelay !== undefined && decoration.parallaxDelay > 0) {
            // Delay the start of parallax
            // If delay is 0.3, parallax only starts when scrollProgress reaches 0.3
            if (scrollProgress < decoration.parallaxDelay) {
              adjustedProgress = 0; // No rotation yet
            } else {
              // Map the remaining progress (delay to 1) to (0 to 1)
              adjustedProgress = (scrollProgress - decoration.parallaxDelay) / (1 - decoration.parallaxDelay);
              adjustedProgress = Math.max(0, Math.min(1, adjustedProgress));
            }
          }
          const calculatedRotation = adjustedProgress * decoration.parallaxRotation;
          newRotations[idx] = calculatedRotation;
        }
      });
      
      // Always update rotations, even if empty, to ensure state updates
      setRotations(newRotations);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateRotations);
    };

    // Initial calculation after mount
    const timer = setTimeout(calculateRotations, 200);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
          <section ref={sectionRef} className="relative w-full overflow-hidden md:overflow-visible flex items-center justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6" style={{ paddingBottom: '300px', backgroundColor: '#fff7e3', marginTop: '-1px' }}>
      {/* Decorations */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-visible">
        {OUR_STORY_DECORATIONS.map((decoration, idx) => {
          const getOpacity = () => {
            if (!decoration.opacity) return 1;
            const match = decoration.opacity.match(/(\d+)/);
            return match ? parseInt(match[1]) / 100 : 1;
          };

          // Get parallax rotation from state
          const getParallaxTransform = () => {
            const rotation = rotations[idx];
            
            // If no parallax rotation configured, return base transform
            if (decoration.parallaxRotation === undefined) {
              return decoration.transform || "";
            }
            
            // Get parallax rotation from state (can be 0, which is valid)
            const currentRotation = typeof rotation === 'number' ? rotation : undefined;
            
            // Get base transform
            let baseTransform = decoration.transform || "";
            
            // If parallax rotation has been calculated, apply it
            if (currentRotation !== undefined) {
              // Remove any rotation from base transform
              if (baseTransform && baseTransform.includes('rotate')) {
                baseTransform = baseTransform.replace(/rotate\([^)]+\)/g, '').trim();
              }
              
              // Combine base transform with parallax rotation (even if 0)
              const parallaxRotate = `rotate(${currentRotation.toFixed(2)}deg)`;
              
              if (baseTransform) {
                return `${baseTransform} ${parallaxRotate}`.trim();
              }
              
              return parallaxRotate;
            }
            
            // No parallax rotation calculated yet, return base transform
            return baseTransform;
          };

          return (
            <img
              key={idx}
              src={decoration.src}
              alt={decoration.alt}
              loading="lazy"
              className={`absolute ${decoration.width} ${decoration.opacity || ''} aspect-square object-contain`}
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
                opacity: getOpacity(),
                transform: getParallaxTransform(),
                willChange: decoration.parallaxRotation !== undefined ? 'transform' : 'auto',
              }}
            />
          );
        })}
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-[970px] mx-auto text-center px-4 sm:px-6 md:px-4">
        <h2 className="font-akatab font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] text-[#2A1515] opacity-70 leading-tight lg:leading-[70px] md:ml-[59px]" style={{ marginBottom: 'calc(1.5rem + 30px)' }}>
          Our Story
        </h2>

        <p className="font-akatab font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] text-black opacity-80 leading-relaxed lg:leading-[35px] max-w-full mx-auto text-center px-2 sm:px-4 md:px-0">
          At HydroHerbs, we handcraft natural tea infusions designed to nourish
          your body and elevate your daily wellness. Our blends are made from
          carefully selected herbs, flowers and botanicals, chosen for their
          flavour, aroma and natural benefits. From digestion and immunity to
          skin glow and calmness, each infusion is created with purpose, clean,
          pure and full of nature's goodness. We believe wellness can be simple,
          delicious and sustainable, one cup at a time.
        </p>
      </div>
    </section>
  );
}