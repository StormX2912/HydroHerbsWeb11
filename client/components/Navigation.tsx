import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  // All product routes should highlight HOME
  const productRoutes = ["/", "/peace-flow-blend", "/hair-vitality-blend"];
  const isHome = productRoutes.includes(location.pathname);

  return (
    <nav className="fixed top-4 sm:top-6 md:top-8 lg:top-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-2 sm:px-4">
      <div className="inline-flex p-0.5 items-center rounded-[50px] border border-white/25 bg-white/16 backdrop-blur-sm">
        <Link
          to="/"
          className={`flex px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-2.5 sm:py-3 md:py-3.5 lg:py-4 justify-center items-center rounded-[50px] transition-all ${
            isHome
              ? "border-2 sm:border-4 border-white/24 bg-white shadow-sm"
              : "border-2 sm:border-4 border-transparent"
          }`}
        >
          <span
            className={`text-center font-akatab text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-tight uppercase whitespace-nowrap ${
              isHome ? "text-[#2A1515] opacity-100" : "text-white opacity-70"
            }`}
          >
            HOME
          </span>
        </Link>
        <Link
          to="/contact"
          className={`flex px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-2.5 sm:py-3 md:py-3.5 lg:py-4 justify-center items-center rounded-[50px] transition-all ${
            location.pathname === "/contact"
              ? "border-2 sm:border-4 border-white/40 bg-white/20 shadow-sm"
              : "border-2 sm:border-4 border-transparent"
          }`}
        >
          <span
            className={`text-center font-akatab text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-tight uppercase whitespace-nowrap ${
              location.pathname === "/contact" ? "text-white opacity-100" : "text-[#2A1515] opacity-70"
            }`}
          >
            Contact us
          </span>
        </Link>
      </div>
    </nav>
  );
}
