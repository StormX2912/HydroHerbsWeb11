import { useEffect, useState, useRef } from "react";

export default function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({ windowHeight: 0, documentHeight: 0, scrollbarHeight: 0 });
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;
    
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Get actual scrollbar container height
      const scrollbarHeight = scrollbarRef.current?.getBoundingClientRect().height || windowHeight - 80;
      
      // Update dimensions
      setDimensions({ windowHeight, documentHeight, scrollbarHeight });
      
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollTop / maxScroll)) : 0;
      
      setScrollProgress(progress);
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    const handleResize = () => {
      updateScrollProgress();
    };

    // Initial calculation
    updateScrollProgress();

    // Update on scroll with requestAnimationFrame for smoothness
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbRef.current || !scrollbarRef.current) return;
    
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScroll.current = window.scrollY;
    
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollbarRef.current) return;
      
      const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
      const scrollbarHeight = scrollbarRect.height;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const scrollbarPadding = 40;
      const availableHeight = windowHeight - (scrollbarPadding * 2);
      const thumbHeightPercent = maxScroll > 0 
        ? Math.max(10, Math.min(100, (availableHeight / documentHeight) * 100)) 
        : 100;
      const thumbHeight = scrollbarHeight * (thumbHeightPercent / 100);
      
      const deltaY = e.clientY - dragStartY.current;
      const scrollRatio = deltaY / (scrollbarHeight - thumbHeight);
      
      const newScroll = dragStartScroll.current + scrollRatio * maxScroll;
      window.scrollTo(0, Math.max(0, Math.min(maxScroll, newScroll)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleScrollbarClick = (e: React.MouseEvent) => {
    if (!scrollbarRef.current || isDragging) return;
    if (thumbRef.current?.contains(e.target as Node)) return;
    
    const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
    const clickY = e.clientY - scrollbarRect.top;
    const scrollbarHeight = scrollbarRect.height;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollbarPadding = 40;
    const availableHeight = windowHeight - (scrollbarPadding * 2);
    const thumbHeightPercent = maxScroll > 0 
      ? Math.max(10, Math.min(100, (availableHeight / documentHeight) * 100)) 
      : 100;
    const thumbHeight = scrollbarHeight * (thumbHeightPercent / 100);
    
    const clickRatio = clickY / (scrollbarHeight - thumbHeight);
    
    const newScroll = clickRatio * maxScroll;
    window.scrollTo(0, Math.max(0, Math.min(maxScroll, newScroll)));
  };

  // Calculate dimensions dynamically
  const scrollbarPadding = 40; // 40px padding from top and bottom
  const { windowHeight, documentHeight, scrollbarHeight } = dimensions;
  const maxScroll = documentHeight - windowHeight;
  
  // Use actual scrollbar container height or calculate it
  const scrollbarContainerHeight = scrollbarHeight > 0 ? scrollbarHeight : windowHeight - (scrollbarPadding * 2);
  
  // Calculate thumb height: represents visible portion of document
  // If viewport shows 50% of document, thumb should be 50% of scrollbar
  const thumbHeightPx = maxScroll > 0 && documentHeight > 0
    ? Math.max(30, (windowHeight / documentHeight) * scrollbarContainerHeight)
    : scrollbarContainerHeight;
  
  // Calculate thumb height as percentage of scrollbar container
  const thumbHeightPercent = scrollbarContainerHeight > 0 
    ? (thumbHeightPx / scrollbarContainerHeight) * 100 
    : 100;
  
  // Calculate thumb position in percentage
  // The thumb can move from 0% to (100% - thumbHeightPercent%)
  const maxThumbPosition = Math.max(0, 100 - thumbHeightPercent);
  const thumbPosition = scrollProgress * maxThumbPosition;

  return (
    <div
      ref={scrollbarRef}
      onClick={handleScrollbarClick}
      className="fixed right-0 w-2 bg-transparent z-50 cursor-pointer"
      style={{ 
        pointerEvents: 'auto',
        top: `${scrollbarPadding}px`,
        bottom: `${scrollbarPadding}px`,
        height: 'auto',
      }}
    >
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className="absolute right-0 bg-[#2A1515]/20 hover:bg-[#2A1515]/50 rounded-full transition-all cursor-grab active:cursor-grabbing"
        style={{
          width: '8px',
          height: `${thumbHeightPercent}%`,
          top: `${thumbPosition}%`,
          transform: 'translateX(-2px)',
          willChange: 'top, height',
          transition: isDragging 
            ? 'none' 
            : 'top 0.08s cubic-bezier(0.4, 0.0, 0.2, 1), height 0.08s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.2s ease',
        }}
      />
    </div>
  );
}

