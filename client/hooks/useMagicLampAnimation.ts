import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useMagicLampAnimation() {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => setIsAnimating(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isAnimating;
}
