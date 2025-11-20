import Quote from "@/pages/Quote";
import OurStory from "@/pages/OurStory";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  bgColor: string;
  bgAccent: string;
  bgStripe: string;
  accentCircle: string;
  bottle: string;
  decorations: Array<{
    src: string;
    alt: string;
    width: string;
    opacity?: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    transform: string;
    delay: string;
    maxWidth?: string;
    zIndex?: number;
  }>;
}

const PRODUCTS: Product[] = [
  {
    id: "skin-glow",
    name: "Skin Glow Blend",
    description:
      "The Skin Glow Blend enhances your natural radiance by keeping the skin hydrated, clear, and refreshed. Its tart, floral taste with subtle hints of lemon and rose offers a light, uplifting experience that feels as rejuvenating as it tastes.",
    ingredients:
      "Main ingredients: Rose petals, hibiscus, moringa leaves, lemongrass",
    bgColor: "#DF758A",
    bgStripe: "#E28297",
    bgAccent: "#F64565",
    accentCircle: "#F64565",
    bottle:
      "https://api.builder.io/api/v1/image/assets/TEMP/821464b5b14b3cf2f9baee5fb2ec9c5912525596?width=1200",
    decorations: [
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774",
        alt: "Rose decoration1",
        width: "w-36 md:w-52 lg:w-72 xl:w-88",
        opacity: "opacity-90",
        top: "50px",
        left: "-900px",
        transform: "rotate(-59.718deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774",
        alt: "Rose decoration2",
        width: "w-36 md:w-52 lg:w-72 xl:w-88",
        opacity: "opacity-90",
        top: "50px",
        left: "-45%",
        transform: "rotate(-59.718deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774",
        alt: "Rose decoration3",
        width: "w-40 md:w-56 lg:w-80 xl:w-96",
        opacity: "opacity-90",
        bottom: "600px",
        right: "150px",
        transform: "rotate(-59.718deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774",
        alt: "Rose decoration4",
        width: "w-36 md:w-52 lg:w-80",
        opacity: "opacity-90",
        top: "600px",
        left: "-200px",
        transform: "rotate(-59.718deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774",
        alt: "Rose decoration5",
        width: "w-36 md:w-52 lg:w-72 xl:w-88",
        opacity: "opacity-90",
        top: "300px",
        left: "-50%",
        transform: "rotate(-59.718deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/fcdc5655c8700c6a23ab5365ed1b00d4a230b2f6?width=774",
        alt: "Rose decoration6",
        width: "w-36 md:w-52 lg:w-72 xl:w-88",
        opacity: "opacity-90",
        top: "300px",
        left: "-580px",
        transform: "rotate(-59.718deg)",
        delay: "0.1s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/019bf154f8be281d5dbcaf066e53377bd471d23e?width=731",
        alt: "Rose decoration7",
        width: "w-36 md:w-52 lg:w-88 xl:w-[422px]",
        opacity: "opacity-90",
        bottom: "200px",
        left: "-10px",
        transform: "rotate(-59.718deg)",
        delay: "0.2s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/0668ceddc7354acab6b77bad9f4d7206ff4e179c?width=769",
        alt: "Rose decoration8",
        width: "w-36 md:w-80 lg:w-72",
        opacity: "opacity-90",
        top: "250px",
        right: "-10px",
        transform: "rotate(-73.227deg)",
        delay: "0.15s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/df91f9dceee6a48712c3cbc50b353cd83c435d5b?width=679",
        alt: "Moringa leaves",
        width: "w-32 md:w-48 lg:w-60 xl:w-72",
        top: "70px",
        right: "3%",
        transform: "rotate(-11.287deg)",
        delay: "0.25s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/5b7422c262df01e46d2bdc35d57bb431d730ec48?width=220",
        alt: "Lemongrass",
        width: "w-[77px] md:w-[123px] lg:w-[141px]",
        top: "-60px",
        left: "24%",
        transform: "rotate(-5.305deg)",
        delay: "0.3s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/2a61e50a6479c3ae6ab277729578f9ad25dbca22?width=342",
        alt: "Hibiscus",
        width: "w-20 md:w-32 lg:w-36",
        top: "300px",
        left: "335px",
        transform: "rotate(160.235deg)",
        delay: "0.35s",
      },
    ],
  },
  {
    id: "peace-flow",
    name: "Peace Flow Blend",
    description:
      "Specially crafted to support smooth digestion, ease bloating and discomfort. Its sweet-spicy flavor with a touch of mint and ginger leaves you feeling warm, refreshed, and restored from within.",
    ingredients:
      "Main ingredients: Fennel seeds, ginger, mint leaves, licorice dandelion root",
    bgColor: "#D5B68B",
    bgStripe: "#D9BD96",
    bgAccent: "#FFCB5C",
    accentCircle: "#FFCB5C",
    bottle:
      "https://api.builder.io/api/v1/image/assets/TEMP/349447538d8bdda7b55c011fa5583dc27df96774?width=1219",
    // Peace Flow Blend Decorations - Adjust position and size here:
    // - width: Size (responsive) - format: "w-64 md:w-96 lg:w-[900px]"
    // - top/left/bottom/right: Position - use px (e.g., "245px") or % (e.g., "24%")
    // - transform: Rotation - format: "rotate(57.643deg)"
    decorations: [
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/6427bcc0cb42ec39bdd69f5340ec550fa2706229?width=3974",
        alt: "Fennel decoration",
        width: "w-64 md:w-96 lg:w-[900px]",
        opacity: "opacity-100",
        top: "-290px",
        left: "-466px",
        transform: "rotate(-8.685deg)",
        delay: "0s",
        maxWidth: "1000%",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/6427bcc0cb42ec39bdd69f5340ec550fa2706229?width=3974",
        alt: "Fennel decoration",
        width: "w-[325px] md:w-[489px] lg:w-[613px]",
        opacity: "opacity-100",
        top: "340px",
        left: "100px",
        transform: "rotate(-8.685deg)",
        delay: "0s",
        maxWidth: "1000%",
      },

      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/c00e90904d690e051670295189a57738bae2a96a?width=469",
        alt: "Dandelion",
        width: "w-20 md:w-32 lg:w-44",
        opacity: "opacity-100",
        top: "53px",
        left: "345px",
        transform: "rotate(4.643deg)",
        delay: "0.1s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/6166e7677babb06b5f793a09010c56b5805871a1?width=366",
        alt: "Dandelion",
        width: "w-16 md:w-24 lg:w-36",
        opacity: "opacity-100",
        top: "250px",
        left: "130px",
        transform: "rotate(-35.514deg)",
        delay: "0.2s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/a5b302d1d5d3c04dad13930f03a11487a953f461?width=169",
        alt: "Ginger",
        width: "w-12 md:w-16 lg:w-24",
        opacity: "opacity-100",
        top: "363px",
        left: "100px",
        transform: "rotate(-134.486deg)",
        delay: "0.3s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/cb26ae59073e664f403f9450d8035f42027380eb?width=268",
        alt: "Ginger",
        width: "w-[61px] md:w-[91px] lg:w-[107px]",
        opacity: "opacity-100",
        bottom: "800px",
        right: "190px",
        transform: "rotate(0deg)",
        delay: "0.15s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/28e3e3a70ef4a81617183fc82af9f92fb5f0240e?width=142",
        alt: "Licorice",
        width: "w-[56px] md:w-[78px] lg:w-[89px]",
        opacity: "opacity-100",
        top: "-20px",
        left: "206px",
        transform: "rotate(0deg)",
        delay: "0.25s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/6f8a2dfe0df07127c40b624d278ee4ba5cb70d8b?width=258",
        alt: "Licorice",
        width: "w-[89px] md:w-[134px] lg:w-[156px]",
        opacity: "opacity-100",
        top: "-50px",
        left: "152px",
        transform: "rotate(5.139deg)",
        delay: "0.05s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/dab489be0cb4a6e7b99b49501b7ccd0f359c7f01?width=1208",
        alt: "Mint leaves",
        width: "w-48 md:w-64 lg:w-80",
        opacity: "opacity-90",
        top: "80px",
        left: "235px",
        transform: "rotate(0deg)",
        delay: "0.35s",
      },
    ],
  },
  {
    id: "hair-vitality",
    name: "Hair Vitality Blend",
    description:
      "For stronger, healthier hair, the Hair Vitality Blend nourishes from root to tip, supporting growth and scalp vitality. With its earthy sweetness and gentle herbal notes, it brings a soothing balance to your daily self-care ritual.",
    ingredients:
      "Main ingredients: Brahmi, nettle leaf, hibiscus, amla, rosemary",
    bgColor: "#7C1A8B",
    bgStripe: "#893197",
    bgAccent: "#8F3A72",
    accentCircle: "#8F3A72",
    bottle:
      "https://api.builder.io/api/v1/image/assets/TEMP/a5bff7412cddc9ae5fc39c045b166e1cf3fd232d?width=1200",
    decorations: [
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/32a16426f056e85b0beb0658b1239defc4ff32e5?width=1980",
        alt: "Leaves decoration",
        width: "w-64 md:w-96 lg:w-[555px]",
        opacity: "opacity-100",
        top: "90px",
        left: "-844px",
        transform: "rotate(8.766deg)",
        delay: "0s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/8bfb5fd8bdd6f12b74088a272c485042a4b6f908?width=1906",
        alt: "Leaves decoration",
        width: "w-64 md:w-96 lg:w-[425px]",
        opacity: "opacity-100",
        top: "380px",
        left: "-261px",
        transform: "rotate(-145.793deg)",
        delay: "0.1s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/8bfb5fd8bdd6f12b74088a272c485042a4b6f908?width=1906",
        alt: "Leaves decoration",
        width: "w-64 md:w-96 lg:w-[374px]",
        opacity: "opacity-100",
        top: "400px",
        left: "50px",
        transform: "rotate(-145.793deg)",
        delay: "0.1s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/edf3486bbd7b1656ca7fe4a8eba8d41420b955a2?width=1405",
        alt: "Leaves decoration",
        width: "w-48 md:w-72 lg:w-[446px]",
        opacity: "opacity-100",
        top: "154px",
        left: "298px",
        transform: "rotate(-87.149deg)",
        delay: "0.2s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/c4a62cc87a8b6f7d21500fd6ad23f43f021351aa?width=278",
        alt: "Amla",
        width: "w-16 md:w-24 lg:w-28",
        opacity: "opacity-100",
        top: "43px",
        left: "80px",
        transform: "rotate(0deg)",
        delay: "0.3s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1476a0e56c4dee6253d57f723b172c5f16fa7d4a?width=256",
        alt: "Amla",
        width: "w-16 md:w-24 lg:w-28",
        opacity: "opacity-100",
        top: "129px",
        left: "437px",
        transform: "rotate(0deg)",
        delay: "0.15s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1dfbf81bacef582cd951aafc2ad97e54f78c2b71?width=618",
        alt: "Brahmi",
        width: "w-32 md:w-48 lg:w-[269px]",
        opacity: "opacity-90",
        top: "209px",
        left: "65px",
        transform: "rotate(0.211deg)",
        delay: "0.05s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/9e8ff1e11e3643f90b17040e023c517b1a3a8816?width=352",
        alt: "Rosemary",
        width: "w-20 md:w-32 lg:w-36",
        opacity: "opacity-100",
        top: "-65px",
        left: "150px",
        transform: "rotate(-0.437deg)",
        delay: "0.25s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/96d5b86a821ae10f56dfd63917d9ab1b6a060923?width=230",
        alt: "Hibiscus",
        width: "w-[54px] md:w-[68px] lg:w-[82px]",
        opacity: "opacity-100",
        top: "200px",
        left: "6%",
        transform: "rotate(0deg)",
        delay: "0.35s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/af20c4b1cb2716d3c995d7a266cf3592def69b01?width=386",
        alt: "Hibiscus",
        width: "w-[82px] md:w-[109px] lg:w-[136px]",
        opacity: "opacity-100",
        top: "-130px",
        left: "250px",
        transform: "rotate(0deg)",
        delay: "0.12s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/e5f35e225bcb1c8162e82172ca5b4d28f9a49fb0?width=218",
        alt: "Hibiscus",
        width: "w-[54px] md:w-[68px] lg:w-[82px]",
        opacity: "opacity-100",
        top: "145px",
        left: "130px",
        transform: "rotate(0deg)",
        delay: "0.22s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/1e26152c2901c61e00aed43c02c23f32fb51c5e4?width=522",
        alt: "Nettle",
        width: "w-24 md:w-36 lg:w-[211px]",
        opacity: "opacity-90",
        top: "226px",
        left: "337px",
        transform: "rotate(45.588deg)",
        delay: "0.32s",
      },
      {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/6e987831253126cb5faf39d2f20addc49f974de1?width=352",
        alt: "Hibiscus",
        width: "w-[68px] md:w-[95px] lg:w-[130px]",
        opacity: "opacity-100",
        top: "260px",
        left: "350px",
        transform: "rotate(9.081deg)",
        delay: "0.28s",
      },
    ],
  },
];

// Product menu items
interface ProductMenuItem {
  id: string;
  name: string;
  image: string;
  path: string;
}

const PRODUCT_MENU_ITEMS: ProductMenuItem[] = [
  {
    id: "skin",
    name: "Skin Glow Blend",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a9710a88d93a1863cbed3ad0a253e0b7b1aa9fe5?width=270",
    path: "/",
  },
  {
    id: "peace",
    name: "Peace Flow Blend",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/eb8e263180ec2b536285dd4f4b8e565dbde93e95?width=270",
    path: "/peace-flow-blend",
  },
  {
    id: "hair",
    name: "Hair Vitality Blend",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/289314518e44682b103f27a3c24e57f9125a07b4?width=270",
    path: "/hair-vitality-blend",
  },
];

export default function Products() {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [descriptionIndex, setDescriptionIndex] = useState(0); // Separate index for description that updates immediately
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'prepare' | 'exit'>('prepare');
  const [isEntering, setIsEntering] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState<'prepare' | 'final' | undefined>(undefined);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);
  const entranceTimersRef = useRef<{ entranceTimer?: NodeJS.Timeout; entrancePrepareTimer?: NodeJS.Timeout; entranceFinalTimer?: NodeJS.Timeout }>({});
  const entranceTriggeredRef = useRef<string | null>(null); // Track which pathname triggered entrance
  // All product routes should highlight HOME
  const productRoutes = ["/", "/peace-flow-blend", "/hair-vitality-blend"];
  const isHome = productRoutes.includes(location.pathname);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // ========================================
  // DESKTOP POSITIONING CONFIG (Adjust in px)
  // ========================================
  const DESKTOP_HERO_CONFIG = {
    // Container positioning - moves the entire container
    containerMarginLeft: -224,     // px - left margin of text container (negative moves left, positive moves right)
    containerMarginRight: 0,       // px - right margin of text container
    containerPaddingLeft: 0,       // px - left padding of text container
    containerPaddingRight: 0,      // px - right padding of text container
    containerPaddingTop: 0,        // px - top padding of text container
    containerPaddingBottom: 0,     // px - bottom padding of text container
    
    // Heading positioning (relative to container)
    headingMarginLeft: 0,          // px - left margin of heading (relative to container)
    headingMarginRight: 0,         // px - right margin of heading
    headingMarginTop: 0,           // px - top margin of heading
    headingMarginBottom: 0,        // px - bottom margin of heading
    
    // Description positioning (relative to container)
    descriptionMarginLeft: 0,      // px - left margin of description (relative to container)
    descriptionMarginRight: 0,     // px - right margin of description
    descriptionMarginTop: 0,       // px - top margin of description (space after heading)
    descriptionMarginBottom: 0,    // px - bottom margin of description
  };

  // Helper function to convert px to responsive clamp for desktop
  const pxToResponsive = (px: number, minMultiplier = 0.5, maxMultiplier = 1.2) => {
    if (px === 0) return "0px";
    const isNegative = px < 0;
    const absPx = Math.abs(px);
    const min = Math.round(absPx * minMultiplier) * (isNegative ? -1 : 1);
    const max = Math.round(absPx * maxMultiplier) * (isNegative ? -1 : 1);
    const vwValue = (absPx / 19.2) * (isNegative ? -1 : 1);
    return `clamp(${min}px, ${vwValue}vw, ${max}px)`;
  };

  // Helper function to convert px to vw (viewport width) - supports negative values
  const pxToVw = (px: number, baseWidth = 1920) => {
    return `${(px / baseWidth) * 100}vw`;
  };

  useEffect(() => {
    const pathToIndex: { [key: string]: number } = {
      "/": 0,
      "/peace-flow-blend": 1,
      "/hair-vitality-blend": 2,
    };
    const newIndex = pathToIndex[location.pathname] ?? 0;

    // Reset entrance trigger ref when pathname changes (unless it's the same pathname)
    if (entranceTriggeredRef.current !== null && entranceTriggeredRef.current !== location.pathname) {
      entranceTriggeredRef.current = null;
    }

    // Prevent new transitions if one is already in progress
    if (newIndex !== currentIndex && (isTransitioning || isEntering)) {
      return; // Ignore the change if a transition is already happening
    }

    if (newIndex !== currentIndex) {
      // Store the target index before updating currentIndex
      const targetIndex = newIndex;
      // Update descriptionIndex immediately so description starts moving right away
      setDescriptionIndex(targetIndex);
      // Add 100ms delay before starting the exit animation
      const initialDelayTimer = setTimeout(() => {
        setIsTransitioning(true);
        setHasExploded(false);
        setTransitionPhase('prepare'); // Start with preparation phase
        
        // Phase 1: Bottle rotates 9.2deg left, decorations scale down and move down 50px (650ms)
        // Start phase 2 earlier so bottle starts moving down while rotating
        const prepareTimer = setTimeout(() => {
          setTransitionPhase('exit'); // Move to exit phase earlier - bottle moves down as it rotates
        }, 250); // Start exit at ~38% of 650ms for earlier overlap
      
        // Start entrance animation much earlier - when exit Phase 2 is 40% complete (product just starting to exit)
        // Exit Phase 2 starts at 250ms and lasts 1500ms, so 40% = 250 + (1500 * 0.4) = 850ms
        const entranceStartTimer = setTimeout(() => {
          setCurrentIndex(targetIndex); // Update currentIndex for bottle/decorations during entrance
          setHasExploded(false); // Reset explosion state for smooth entrance
          setIsTransitioning(false);
          setTransitionPhase('prepare');
          // Reset entrancePhase to undefined first (this will position decorations at below screen)
          // Then set entering state and start phase 1
          setEntrancePhase(undefined); // Reset to allow initial below-screen state
          setIsEntering(true);
          // Small delay to ensure initial rotated state is visible before transitioning
          setTimeout(() => {
            setEntrancePhase('prepare'); // Start Phase 1 transition with rotation visible
          }, 50); // 50ms delay to show initial rotation
          
          // Entrance Phase 1 (reverse of exit Phase 2): Move up from below and rotate from -9.7deg to -9.2deg (1600ms)
          // Start phase 2 at 30% of phase 1 (480ms) for earlier rotation
          const entrancePrepareTimer = setTimeout(() => {
            setEntrancePhase('final'); // Move to final phase (reverse of exit phase 1)
          }, 480); // Start final phase at 30% of 1600ms for earlier rotation
          
          // Entrance Phase 2 (reverse of exit Phase 1): Rotate from -9.2deg to 0deg (800ms)
          const entranceFinalTimer = setTimeout(() => {
            setIsEntering(false);
            setEntrancePhase('prepare');
            setDescriptionIndex(targetIndex); // Sync descriptionIndex with currentIndex after entrance
            // Trigger explosion after entrance completes
            setTimeout(() => setHasExploded(true), 50);
          }, 2400); // Total: 1600ms prepare + 800ms final = 2400ms
          
          return () => {
            clearTimeout(entrancePrepareTimer);
            clearTimeout(entranceFinalTimer);
          };
        }, 850); // Start entrance at 40% through exit Phase 2 (much earlier)
        
        // Phase 2: Everything moves out together (1500ms after transition starts)
        const exitTimer = setTimeout(() => {
          // Just cleanup - entrance already started
        }, 2150); // Total: 650ms prepare + 1500ms exit (overlapping for seamless feel)
        
        return () => {
          clearTimeout(prepareTimer);
          clearTimeout(exitTimer);
          clearTimeout(entranceStartTimer);
        };
      }, 0); // 0ms delay - animation starts immediately
      
      return () => {
        clearTimeout(initialDelayTimer);
      };
    } else if (!hasExploded) {
      // Check if we're coming from contact page (via sessionStorage or referrer)
      const isComingFromContact = sessionStorage.getItem('fromContact') === 'true' || 
                                   document.referrer.includes('/contact');
      
      if (isComingFromContact) {
        // Prevent double triggering - check if entrance already triggered for this pathname
        if (entranceTriggeredRef.current === location.pathname) {
          return; // Already triggered, skip
        }
        
        // Mark this pathname as having triggered entrance
        entranceTriggeredRef.current = location.pathname;
        
        // Coming from contact - trigger entrance animation
        sessionStorage.removeItem('fromContact'); // Clear the flag
        
        // Set currentIndex first to ensure correct product is shown
        setCurrentIndex(newIndex);
        setDescriptionIndex(newIndex);
        
        // Reset all animation states
        setHasExploded(false);
        setIsTransitioning(false);
        setTransitionPhase('prepare');
        
        // Set initial state first - bottle and decorations start below screen
        setIsEntering(true);
        setEntrancePhase(undefined); // Start from below screen
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Start entrance animation after View Transition completes
            const entranceTimer = setTimeout(() => {
              setEntrancePhase('prepare'); // Start Phase 1 - animate up and rotate
            }, 0); // Start immediately
            
            const entrancePrepareTimer = setTimeout(() => {
              setEntrancePhase('final'); // Move to final phase - complete rotation
            }, 480); // 0ms + 480ms
            
            const entranceFinalTimer = setTimeout(() => {
              setIsEntering(false);
              setEntrancePhase('prepare');
              setTimeout(() => setHasExploded(true), 50);
              // Clear the trigger ref after animation completes
              entranceTriggeredRef.current = null;
            }, 2400); // 0ms + 2400ms
            
            entranceTimersRef.current = {
              entranceTimer,
              entrancePrepareTimer,
              entranceFinalTimer
            };
          });
        });
        
        return () => {
          if (entranceTimersRef.current.entranceTimer) clearTimeout(entranceTimersRef.current.entranceTimer);
          if (entranceTimersRef.current.entrancePrepareTimer) clearTimeout(entranceTimersRef.current.entrancePrepareTimer);
          if (entranceTimersRef.current.entranceFinalTimer) clearTimeout(entranceTimersRef.current.entranceFinalTimer);
        };
      } else {
        // Initial load - sync descriptionIndex and trigger explosion after a short delay
        setDescriptionIndex(newIndex);
        const initialTimer = setTimeout(() => setHasExploded(true), 100);
        return () => clearTimeout(initialTimer);
      }
    }
  }, [location.pathname, currentIndex, hasExploded, isTransitioning, isEntering]);

  const product = PRODUCTS[currentIndex];

  return (
    <div
      className="relative transition-colors duration-700"
      style={{ 
        backgroundColor: product.bgColor, 
        transitionDelay: '700ms',
        transitionDuration: '1200ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="relative min-h-screen overflow-visible" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none hidden md:flex">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-full transition-colors duration-700"
              style={{
                width: "clamp(40px, 120px, 8vw)",
                marginLeft: i === 0 ? "0" : "clamp(2px, calc((100vw - 1612px) / 24 + 10px), 30px)",
                marginRight: "clamp(2px, calc((100vw - 1612px) / 24 + 10px), 30px)",
                marginTop: i === 1 ? "-3px" : "0",
                backgroundColor: product.bgStripe,
                transitionDelay: '700ms',
                transitionDuration: '1200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-[247px] right-[156px] w-[585px] h-[585px] rounded-full blur-[100px] opacity-100 pointer-events-none hidden xl:block transition-colors duration-700"
          style={{ 
            backgroundColor: product.accentCircle, 
            transitionDelay: '700ms',
            transitionDuration: '1200ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-4 sm:top-6 md:top-8 lg:top-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
          <div className="inline-flex p-0.5 items-center rounded-[50px] border border-white/25 bg-white/16 backdrop-blur-sm">
            <Link
              to="/"
              className={`flex px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3.5 md:py-4 justify-center items-center rounded-[50px] transition-all ${
                isHome
                  ? "border-2 sm:border-4 border-white/24 bg-white shadow-sm"
                  : "border-2 sm:border-4 border-transparent"
              }`}
            >
              <span
                className={`text-center font-akatab text-sm sm:text-base md:text-lg font-bold leading-tight uppercase whitespace-nowrap ${
                  isHome ? "text-[#2A1515] opacity-100" : "text-[#2A1515] opacity-70"
                }`}
              >
                HOME
              </span>
            </Link>
            <Link
              to="/contact"
              className={`flex px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3.5 md:py-4 justify-center items-center rounded-[50px] transition-all ${
                location.pathname === "/contact"
                  ? "border-2 sm:border-4 border-white/24 bg-white"
                  : "border-2 sm:border-4 border-transparent"
              }`}
            >
              <span
                className={`text-center font-akatab text-sm sm:text-base md:text-lg font-bold leading-tight uppercase whitespace-nowrap ${
                  location.pathname === "/contact" ? "text-[#2A1515] opacity-100" : "text-[#2A1515] opacity-70"
                }`}
              >
                Contact us
              </span>
            </Link>
          </div>
        </nav>

        {/* Product Menu - Mobile: Bottom center, Desktop: Aligned with heading + 350px offset */}
        <div 
          className="fixed md:absolute bottom-0 md:bottom-12 left-1/2 md:left-[calc(1rem+clamp(-224px,-11.67vw,0px)+clamp(175px,18.23vw,350px))] lg:left-[calc(1.5rem+clamp(-224px,-11.67vw,0px)+clamp(175px,18.23vw,350px))] xl:left-[calc(4rem+clamp(-224px,-11.67vw,0px)+clamp(175px,18.23vw,350px))] -translate-x-1/2 md:translate-x-0 md:translate-y-[20px] z-40 flex gap-1.5 sm:gap-2 md:gap-4 pb-safe md:pb-0 bg-gradient-to-t from-transparent via-transparent to-transparent md:bg-none px-4 py-3 md:p-0"
        >
          {PRODUCT_MENU_ITEMS.map((productItem) => {
            const isActive = location.pathname === productItem.path;
            return (
              <Link
                key={productItem.id}
                to={productItem.path}
                className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[135px] lg:h-[135px] group"
              >
                <div
                  className={`absolute inset-0 flex items-end justify-center ${
                    isActive ? "z-10" : "z-0"
                  }`}
                >
                  <div
                    className={`rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/24 bg-white/20 md:bg-white/16 backdrop-blur-sm transition-all ${
                      isActive
                        ? "w-[42px] h-[54px] sm:w-[56px] sm:h-[72px] md:w-[70px] md:h-[90px] lg:w-[118px] lg:h-[148px]"
                        : "w-[42px] h-[30px] sm:w-[56px] sm:h-[40px] md:w-[70px] md:h-[50px] lg:w-[118px] lg:h-[78px] opacity-80 group-hover:opacity-100"
                    }`}
                  />
                </div>
                <img
                  src={productItem.image}
                  alt={productItem.name}
                  loading="lazy"
                  className={`relative z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[135px] lg:h-[135px] aspect-square object-contain transition-transform will-change-transform ${
                    isActive ? "scale-100" : "scale-90 group-hover:scale-95"
                  }`}
                  style={{ aspectRatio: "1 / 1" }}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Layout - Stacked vertically with product image first */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-6 lg:px-12 xl:px-16 pt-20 pb-24 md:pt-32 md:pb-40 overflow-x-hidden md:overflow-x-visible overflow-y-visible md:translate-y-[50px]" style={{ overflowY: 'visible' }}>
          {/* Mobile: Single column stack, Desktop: Two column grid */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl overflow-x-hidden md:overflow-x-visible overflow-y-visible" style={{ overflowY: 'visible', overflow: 'visible' }}>
            
            {/* Product Image - Mobile: Top center, Desktop: Right side */}
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-square xl:aspect-[4/5] 2xl:aspect-[3/4] flex items-center justify-center order-1 md:order-2 max-w-sm mx-auto md:max-w-none md:translate-x-[250px] md:scale-[1.65] overflow-visible">
              <div className="absolute inset-0 flex items-center justify-center overflow-visible rounded-2xl md:rounded-none">
                {/* Hide decorations on mobile for cleaner look */}
                <div className="absolute inset-0 md:translate-y-[200px]">
                {product.decorations.map((decoration, idx) => {
                  const getOpacity = () => {
                    if (!decoration.opacity) return 1;
                    const match = decoration.opacity.match(/(\d+)/);
                    return match ? parseInt(match[1]) / 100 : 1;
                  };

                  return (
                    <img
                      key={idx}
                      src={decoration.src}
                      alt={decoration.alt}
                      loading="lazy"
                      className={`absolute ${decoration.width} aspect-square object-contain hidden md:block transition-transform`}
                      style={{
                        aspectRatio: "1 / 1",
                        transitionDuration: isTransitioning 
                          ? "1200ms" 
                          : isEntering 
                            ? (entrancePhase === undefined ? "0ms" : entrancePhase === 'prepare' ? "1900ms" : "0ms") // Slower entry for all blends
                            : "0ms", // No transition when not entering/transitioning
                        transitionDelay: isTransitioning && transitionPhase === 'prepare' ? "250ms" : "0ms", // Match bottle Phase 2 start time
                        transitionTimingFunction: isTransitioning 
                          ? "cubic-bezier(0.85, 0, 0.15, 1)" 
                          : isEntering 
                            ? "cubic-bezier(0.85, 0, 0.15, 1)" // Smooth ease-in-out for entry
                            : "ease",
                        ...(decoration.top && { 
                          top: decoration.top.includes('%') 
                            ? decoration.top 
                            : decoration.top.includes('-')
                              ? `max(${decoration.top}, -100vh)`
                              : `min(${decoration.top}, 200vh)`
                        }),
                        ...(decoration.bottom && { 
                          bottom: decoration.bottom.includes('%')
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
                          right: decoration.right.includes('%')
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
                        transform: isTransitioning 
                          ? (() => {
                              // EXIT: Move 150px right and straight down
                              let rotation = "";
                              if (decoration.transform && decoration.transform.includes("rotate")) {
                                const rotateMatch = decoration.transform.match(/rotate\([^)]+\)/);
                                if (rotateMatch) rotation = rotateMatch[0];
                              }
                              // Apply translateX first (global space), then translateY, then rotation
                              return rotation 
                                ? `translateX(150px) translateY(200vh) ${rotation}`.trim()
                                : `translateX(150px) translateY(200vh)`;
                            })()
                          : isEntering
                          ? (() => {
                              // ENTRY: Start 150px from right, animate to final position
                              // Include rotation in BOTH states to prevent rotation animation
                              let rotation = "";
                              if (decoration.transform && decoration.transform.includes("rotate")) {
                                const rotateMatch = decoration.transform.match(/rotate\([^)]+\)/);
                                if (rotateMatch) rotation = rotateMatch[0];
                              }
                              
                              if (!entrancePhase) {
                                // Initial: below screen and 150px to the right WITH rotation
                                // translateX and translateY applied first so movement is in global space
                                return rotation 
                                  ? `translateX(150px) translateY(200vh) ${rotation}`
                                  : `translateX(150px) translateY(200vh)`;
                              }
                              // Final: at normal position (translateX to 0, translateY to 0) WITH SAME rotation
                              // CSS animates translateX from 150px to 0px and translateY from 200vh to 0px
                              return rotation 
                                ? `translateX(0px) translateY(0px) ${rotation}`
                                : `translateX(0px) translateY(0px)`;
                            })()
                          : decoration.transform || "",
                      }}
                    />
                  );
                })}
                </div>
                <img
                  src={product.bottle}
                  alt="Product Bottle"
                  loading="eager"
                  className={`relative z-10 w-full max-w-[280px] sm:max-w-[320px] md:w-48 lg:w-80 xl:w-96 2xl:w-[500px] aspect-[2/3] object-contain drop-shadow-2xl transition-all will-change-transform`}
                  style={{
                    position: 'absolute',
                    aspectRatio: "2 / 3",
                    transitionDuration: isTransitioning
                      ? (transitionPhase === 'prepare' ? "650ms" : "1500ms")
                      : isEntering
                      ? (entrancePhase === undefined ? "0ms" : entrancePhase === 'prepare' ? "1600ms" : "800ms") // Total 2400ms entry duration
                      : hasExploded ? "0ms" : "0ms", // No transition needed when exploded
                    transitionProperty: "opacity, transform, rotate",
                    opacity: 1, // Always visible
                    transitionTimingFunction: isTransitioning
                      ? (transitionPhase === 'prepare'
                          ? "cubic-bezier(0.85, 0, 0.15, 1)" // Smooth ease-in-out for rotation
                          : "cubic-bezier(0.85, 0, 0.15, 1)") // Smooth ease-in-out for exit Phase 2
                      : isEntering
                      ? (entrancePhase === 'prepare'
                          ? "cubic-bezier(0.85, 0, 0.15, 1)" // Smooth ease-in-out for entrance Phase 1
                          : "cubic-bezier(0.85, 0, 0.15, 1)") // Smooth ease-in-out for entrance Phase 2 rotation correction
                      : "cubic-bezier(0.34, 1.56, 0.64, 1)", // Smooth ease-out-back for initial explosion
                    transitionDelay: isTransitioning 
                      ? transitionPhase === 'prepare' ? "0ms" : "0ms"
                      : isEntering
                      ? (entrancePhase === 'prepare' ? "0ms" : "0ms")
                      : hasExploded ? "150ms" : "0ms",
                    transformOrigin: "center center",
                    transform: isTransitioning
                      ? transitionPhase === 'prepare'
                        ? "translateY(0px) rotate(-20.2deg) scale(1.1)" // Exit Phase 1: Rotate 9.2deg left, stay in place
                        : "translateY(320vh) rotate(-10.7deg) scale(1.1)" // Exit Phase 2: Move all the way down out of frame
                      : isEntering
                      ? entrancePhase === undefined
                        ? "translateY(300vh) rotate(-30deg) scale(0.0001)" // Entrance initial: Start from 300vh below with rotation
                        : entrancePhase === 'prepare'
                        ? "translateY(0px) rotate(-30deg) scale(1.215)" // Entrance Phase 1 target: Move up to center from 300vh below and rotate to -30deg (clearly rotated)
                        : "translateY(0px) rotate(0deg) scale(1.215)" // Entrance Phase 2 target: Rotate from -30deg to 0deg (straight)
                      : hasExploded
                      ? (isDesktop
                          ? "translateY(0px) rotate(0deg) scale(1.215)" // Final position: 0deg rotation
                          : "translateY(0px) rotate(0deg) scale(1)")
                      : "translateY(300vh) rotate(-9.7deg) scale(0.0001)", // Initial state: start from below at -9.7deg
                  }}
                />
              </div>
            </div>

            {/* Content - Mobile: Below image, Desktop: Left side */}
            <div 
              className="space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-12 order-2 md:order-1 text-center md:text-left w-full overflow-x-hidden md:overflow-x-visible overflow-y-visible px-2 sm:px-0"
              style={{
                transform: "translateY(-10px)",
                marginLeft: DESKTOP_HERO_CONFIG.containerMarginLeft !== 0 ? (DESKTOP_HERO_CONFIG.containerMarginLeft > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerMarginLeft)}, ${DESKTOP_HERO_CONFIG.containerMarginLeft}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerMarginLeft}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerMarginLeft)}, 0px)`) : undefined,
                marginRight: DESKTOP_HERO_CONFIG.containerMarginRight !== 0 ? (DESKTOP_HERO_CONFIG.containerMarginRight > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerMarginRight)}, ${DESKTOP_HERO_CONFIG.containerMarginRight}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerMarginRight}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerMarginRight)}, 0px)`) : undefined,
                paddingLeft: DESKTOP_HERO_CONFIG.containerPaddingLeft !== 0 ? (DESKTOP_HERO_CONFIG.containerPaddingLeft > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingLeft)}, ${DESKTOP_HERO_CONFIG.containerPaddingLeft}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerPaddingLeft}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingLeft)}, 0px)`) : undefined,
                paddingRight: DESKTOP_HERO_CONFIG.containerPaddingRight !== 0 ? (DESKTOP_HERO_CONFIG.containerPaddingRight > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingRight)}, ${DESKTOP_HERO_CONFIG.containerPaddingRight}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerPaddingRight}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingRight)}, 0px)`) : undefined,
                paddingTop: DESKTOP_HERO_CONFIG.containerPaddingTop !== 0 ? (DESKTOP_HERO_CONFIG.containerPaddingTop > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingTop)}, ${DESKTOP_HERO_CONFIG.containerPaddingTop}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerPaddingTop}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingTop)}, 0px)`) : undefined,
                paddingBottom: DESKTOP_HERO_CONFIG.containerPaddingBottom !== 0 ? (DESKTOP_HERO_CONFIG.containerPaddingBottom > 0 
                  ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingBottom)}, ${DESKTOP_HERO_CONFIG.containerPaddingBottom}px)`
                  : `clamp(${DESKTOP_HERO_CONFIG.containerPaddingBottom}px, ${pxToVw(DESKTOP_HERO_CONFIG.containerPaddingBottom)}, 0px)`) : undefined,
              }}
            >
              {/* Heading container - clips content, shows one heading at a time */}
              <div 
                className="overflow-hidden"
                style={{
                  height: '180px', // Fixed height to fit one heading
                  marginLeft: DESKTOP_HERO_CONFIG.headingMarginLeft !== 0 ? (DESKTOP_HERO_CONFIG.headingMarginLeft > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginLeft)}, ${DESKTOP_HERO_CONFIG.headingMarginLeft}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.headingMarginLeft}px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginLeft)}, 0px)`) : undefined,
                  marginRight: DESKTOP_HERO_CONFIG.headingMarginRight !== 0 ? (DESKTOP_HERO_CONFIG.headingMarginRight > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginRight)}, ${DESKTOP_HERO_CONFIG.headingMarginRight}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.headingMarginRight}px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginRight)}, 0px)`) : undefined,
                  marginTop: DESKTOP_HERO_CONFIG.headingMarginTop !== 0 ? (DESKTOP_HERO_CONFIG.headingMarginTop > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginTop)}, ${DESKTOP_HERO_CONFIG.headingMarginTop}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.headingMarginTop}px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginTop)}, 0px)`) : undefined,
                  marginBottom: DESKTOP_HERO_CONFIG.headingMarginBottom !== 0 ? (DESKTOP_HERO_CONFIG.headingMarginBottom > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginBottom)}, ${DESKTOP_HERO_CONFIG.headingMarginBottom}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.headingMarginBottom}px, ${pxToVw(DESKTOP_HERO_CONFIG.headingMarginBottom)}, 0px)`) : undefined,
                }}
              >
                {/* Text box wrapper - contains all 3 headings stacked vertically */}
                <div
                  className="transition-transform"
                  style={{
                    transitionDuration: "3800ms",
                    transitionTimingFunction: "cubic-bezier(0.15, 0, 0.05, 1)",
                    transitionDelay: "0ms",
                    transform: `translateY(-${descriptionIndex * 240}px)`,
                  }}
                >
                  {/* Part 1: Skin Glow Blend */}
                  <div style={{ height: '180px', marginBottom: '60px', display: 'flex', alignItems: 'flex-start' }}>
                    <h1 className="font-teko text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[110px] font-bold leading-tight md:leading-none text-white uppercase tracking-tight" style={{ lineHeight: '0.9', margin: 0 }}>
                      {PRODUCTS[0].name}
                    </h1>
                  </div>
                  
                  {/* Part 2: Peace Flow Blend */}
                  <div style={{ height: '180px', marginBottom: '60px', display: 'flex', alignItems: 'flex-start' }}>
                    <h1 className="font-teko text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[110px] font-bold leading-tight md:leading-none text-white uppercase tracking-tight" style={{ lineHeight: '0.9', margin: 0 }}>
                      {PRODUCTS[1].name}
                    </h1>
                  </div>
                  
                  {/* Part 3: Hair Vitality Blend */}
                  <div style={{ height: '180px', display: 'flex', alignItems: 'flex-start' }}>
                    <h1 className="font-teko text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[110px] font-bold leading-tight md:leading-none text-white uppercase tracking-tight" style={{ lineHeight: '0.9', margin: 0 }}>
                      {PRODUCTS[2].name}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Description container - clips content, shows one description at a time */}
              <div 
                className="overflow-hidden max-w-2xl mx-auto md:mx-0"
                style={{
                  height: '240px', // Fixed height to fit one description
                  marginLeft: DESKTOP_HERO_CONFIG.descriptionMarginLeft !== 0 ? (DESKTOP_HERO_CONFIG.descriptionMarginLeft > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginLeft)}, ${DESKTOP_HERO_CONFIG.descriptionMarginLeft}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.descriptionMarginLeft}px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginLeft)}, 0px)`) : undefined,
                  marginRight: DESKTOP_HERO_CONFIG.descriptionMarginRight !== 0 ? (DESKTOP_HERO_CONFIG.descriptionMarginRight > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginRight)}, ${DESKTOP_HERO_CONFIG.descriptionMarginRight}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.descriptionMarginRight}px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginRight)}, 0px)`) : undefined,
                  marginTop: DESKTOP_HERO_CONFIG.descriptionMarginTop !== 0 ? (DESKTOP_HERO_CONFIG.descriptionMarginTop > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginTop + 100)}, ${DESKTOP_HERO_CONFIG.descriptionMarginTop + 100}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.descriptionMarginTop + 100}px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginTop + 100)}, 0px)`) : '100px',
                  marginBottom: DESKTOP_HERO_CONFIG.descriptionMarginBottom !== 0 ? (DESKTOP_HERO_CONFIG.descriptionMarginBottom > 0 
                    ? `clamp(0px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginBottom)}, ${DESKTOP_HERO_CONFIG.descriptionMarginBottom}px)`
                    : `clamp(${DESKTOP_HERO_CONFIG.descriptionMarginBottom}px, ${pxToVw(DESKTOP_HERO_CONFIG.descriptionMarginBottom)}, 0px)`) : undefined,
                }}
              >
                {/* Text box wrapper - contains all 3 descriptions stacked vertically */}
                <div
                  className="transition-transform"
                  style={{
                    transitionDuration: "3800ms",
                    transitionTimingFunction: "cubic-bezier(0.15, 0, 0.05, 1)",
                    transitionDelay: isTransitioning ? "0ms" : "0ms",
                    transform: `translateY(-${descriptionIndex * 240}px)`,
                  }}
                >
                  {/* Part 1: Skin Glow Blend */}
                  <div className="px-2 sm:px-0" style={{ height: '240px', display: 'flex', alignItems: 'flex-start' }}>
                    <p className="font-akatab text-base sm:text-lg md:text-xl leading-relaxed md:leading-relaxed text-white/90 md:text-white/85" style={{ margin: 0 }}>
                      {PRODUCTS[0].description}
                      <br />
                      <br />
                      <span className="font-bold">{PRODUCTS[0].ingredients}</span>
                      <br />
                    </p>
                  </div>
                  
                  {/* Part 2: Peace Flow Blend */}
                  <div className="px-2 sm:px-0" style={{ height: '240px', display: 'flex', alignItems: 'flex-start' }}>
                    <p className="font-akatab text-base sm:text-lg md:text-xl leading-relaxed md:leading-relaxed text-white/90 md:text-white/85" style={{ margin: 0 }}>
                      {PRODUCTS[1].description}
                      <br />
                      <br />
                      <span className="font-bold">{PRODUCTS[1].ingredients}</span>
                      <br />
                    </p>
                  </div>
                  
                  {/* Part 3: Hair Vitality Blend */}
                  <div className="px-2 sm:px-0" style={{ height: '240px', display: 'flex', alignItems: 'flex-start' }}>
                    <p className="font-akatab text-base sm:text-lg md:text-xl leading-relaxed md:leading-relaxed text-white/90 md:text-white/85" style={{ margin: 0 }}>
                      {PRODUCTS[2].description}
                      <br />
                      <br />
                      <span className="font-bold">{PRODUCTS[2].ingredients}</span>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          * {
            transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
        `}</style>
      </div>

      <Quote />
      <OurStory />
      <Footer />
    </div>
  );
}
