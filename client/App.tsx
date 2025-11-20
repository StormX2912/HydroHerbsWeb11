import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CustomScrollbar from "./components/CustomScrollbar";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  const [isLocked, setIsLocked] = useState(false);
  const prevPathnameRef = useRef(location.pathname);
  const [displayPathname, setDisplayPathname] = useState(location.pathname);
  const [prevDisplayPathname, setPrevDisplayPathname] = useState(location.pathname);
  const [opacity, setOpacity] = useState(1);
  const [prevOpacity, setPrevOpacity] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if both current and previous routes are product routes
  const productRoutes = ["/", "/peace-flow-blend", "/hair-vitality-blend"];
  const isProductRoute = (path: string) => productRoutes.includes(path);
  const isSwitchingBetweenProducts = 
    isProductRoute(location.pathname) && isProductRoute(prevPathnameRef.current);
  
  // Check if transitioning between contact and home/product pages
  const isContactToHome = 
    (location.pathname === '/contact' && isProductRoute(prevPathnameRef.current)) ||
    (isProductRoute(location.pathname) && prevPathnameRef.current === '/contact');
  
  // Handle smooth transition for contact <-> home using View Transition API
  useEffect(() => {
    if (isContactToHome && location.pathname !== prevPathnameRef.current) {
      // Set flag if navigating from contact to product page
      const isComingFromContact = prevPathnameRef.current === '/contact';
      const isGoingToProduct = isProductRoute(location.pathname);
      
      if (isComingFromContact && isGoingToProduct) {
        sessionStorage.setItem('fromContact', 'true');
      }
      
      // Check if View Transition API is supported
      if (document.startViewTransition) {
        // Use View Transition API for native smooth transitions
        const transition = document.startViewTransition(() => {
          setDisplayPathname(location.pathname);
          prevPathnameRef.current = location.pathname;
        });
        
        // Wait for transition to complete
        transition.finished.then(() => {
          // Transition complete
        });
      } else {
        // Fallback for browsers without View Transition API
        setIsTransitioning(true);
        setPrevDisplayPathname(displayPathname);
        setPrevOpacity(1);
        
        setDisplayPathname(location.pathname);
        prevPathnameRef.current = location.pathname;
        setOpacity(0);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPrevOpacity(0);
            setOpacity(1);
          });
        });
        
        const cleanupTimer = setTimeout(() => {
          setIsTransitioning(false);
          setPrevOpacity(0);
        }, 1500);
        
        return () => clearTimeout(cleanupTimer);
      }
    } else {
      // No transition needed, update immediately
      setDisplayPathname(location.pathname);
      prevPathnameRef.current = location.pathname;
      setOpacity(1);
      setPrevOpacity(0);
      setIsTransitioning(false);
    }
  }, [location.pathname, isContactToHome, displayPathname]);

  // Set body and html background color to match the destination page (before render)
  useLayoutEffect(() => {
    let bgColor = '#DF758A'; // Default to first product
    
    if (location.pathname === '/contact') {
      bgColor = '#FFFCF5';
    } else {
      // Map product routes to their background colors
      const pathToColor: { [key: string]: string } = {
        '/': '#DF758A', // Skin Glow Blend
        '/peace-flow-blend': '#D5B68B', // Peace Flow Blend
        '/hair-vitality-blend': '#7C1A8B', // Hair Vitality Blend
      };
      bgColor = pathToColor[location.pathname] || '#DF758A';
    }
    
    // Set both body and html background to prevent any white showing through
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;
    
    return () => {
      // Reset on unmount
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [location.pathname]);

  // Lock scroll BEFORE render to prevent any jumping
  useLayoutEffect(() => {
    // Store current scroll position immediately
    const scrollY = window.scrollY;
    
    // Lock immediately - no delay
    // Ensure scrollbar is always hidden during transitions
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto';
    
    if (scrollY > 0) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    }
    
    // Force all scroll positions to 0 immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    
    setIsLocked(true);
    
    return () => {
      // Cleanup on unmount
      const savedScrollY = document.body.style.top ? parseFloat(document.body.style.top) * -1 : 0;
      
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.scrollBehavior = 'smooth'; // Restore smooth scrolling
      
      setIsLocked(false);
    };
  }, [location.pathname]);

  // Restore scroll after animation completes
  useEffect(() => {
    if (!isLocked) return;
    
    // Check if this is a contact-to-home transition
    const isContactToHomeTransition = 
      (location.pathname === '/contact' && isProductRoute(prevPathnameRef.current)) ||
      (isProductRoute(location.pathname) && prevPathnameRef.current === '/contact');
    
    const timer = setTimeout(() => {
      const savedScrollY = document.body.style.top ? parseFloat(document.body.style.top) * -1 : 0;
      
      // Restore scroll smoothly without jump
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
      document.documentElement.style.overflowX = 'hidden';
      
      // Use smooth scroll behavior and ensure we're at the top
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Smoothly scroll to top without jump
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Also set directly to prevent any jump
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      
      setIsLocked(false);
    }, isContactToHomeTransition ? 2400 : 450); // Match animation duration (2300ms + 100ms buffer)
    
    return () => clearTimeout(timer);
  }, [location.pathname, isLocked]);

  // For product-to-product transitions, render without animation
  if (isSwitchingBetweenProducts) {
    return (
      <div style={{ position: 'relative', width: '125%', maxWidth: '125vw', minHeight: '100vh' }}>
        <Routes location={location}>
          <Route path="/" element={<Products />} />
          <Route path="/peace-flow-blend" element={<Products />} />
          <Route path="/hair-vitality-blend" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  // For contact <-> home transitions, use View Transition API or fallback
  if (isContactToHome) {
    // If View Transition API is supported, use simple render with view-transition-name
    if (typeof document !== 'undefined' && document.startViewTransition) {
      return (
        <div 
          style={{ 
            position: 'relative', 
            width: '125%', 
            maxWidth: '125vw',
            minHeight: '100vh',
            viewTransitionName: 'page-content',
          } as React.CSSProperties & { viewTransitionName?: string }}
        >
          <Routes location={{ ...location, pathname: displayPathname } as any}>
            <Route path="/" element={<Products />} />
            <Route path="/peace-flow-blend" element={<Products />} />
            <Route path="/hair-vitality-blend" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      );
    }
    
    // Fallback for browsers without View Transition API
    return (
      <div style={{ 
        position: 'relative', 
        width: '125%', 
        maxWidth: '125vw',
        minHeight: '100vh',
      }}>
        {/* Previous page - fading out */}
        {isTransitioning && prevDisplayPathname && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              maxWidth: '100%',
              overflowX: 'hidden',
              overflowY: 'visible',
              minHeight: '100vh',
              opacity: prevOpacity,
              transition: 'opacity 1.5s cubic-bezier(0.2, 0.0, 0.2, 1)',
              willChange: 'opacity',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <Routes location={{ ...location, pathname: prevDisplayPathname } as any}>
              <Route path="/" element={<Products />} />
              <Route path="/peace-flow-blend" element={<Products />} />
              <Route path="/hair-vitality-blend" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
        
        {/* New page - fading in */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            overflowY: 'visible',
            minHeight: '100vh',
            opacity: opacity,
            transition: 'opacity 1.5s cubic-bezier(0.2, 0.0, 0.2, 1)',
            willChange: 'opacity',
            zIndex: 2,
          }}
        >
          <Routes location={{ ...location, pathname: displayPathname } as any}>
            <Route path="/" element={<Products />} />
            <Route path="/peace-flow-blend" element={<Products />} />
            <Route path="/hair-vitality-blend" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }

  // For all other route changes, render without animation
  return (
    <div style={{ 
      position: 'relative', 
      width: '125%', 
      maxWidth: '125vw',
      minHeight: '100vh',
    }}>
      <Routes location={location}>
        <Route path="/" element={<Products />} />
        <Route path="/peace-flow-blend" element={<Products />} />
        <Route path="/hair-vitality-blend" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function AppRoutes() {
  return <AnimatedRoutes />;
}

function AppComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <CustomScrollbar />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<AppComponent />);
