import { Link, useLocation } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  path: string;
}

const products: Product[] = [
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

export default function ProductMenu() {
  const location = useLocation();

  return (
    <div className="absolute bottom-4 sm:bottom-6 md:bottom-12 left-4 sm:left-6 md:left-12 z-40 flex gap-1.5 sm:gap-2 md:gap-4">
      {products.map((product) => {
        const isActive = location.pathname === product.path;
        return (
          <Link
            key={product.id}
            to={product.path}
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[135px] md:h-[135px] group"
          >
            <div
              className={`absolute inset-0 flex items-end justify-center ${
                isActive ? "z-10" : "z-0"
              }`}
            >
              <div
                className={`rounded-2xl sm:rounded-3xl border border-white/24 bg-white/16 backdrop-blur-sm transition-all ${
                  isActive
                    ? "w-[56px] h-[72px] sm:w-[70px] sm:h-[90px] md:w-[118px] md:h-[148px]"
                    : "w-[56px] h-[40px] sm:w-[70px] sm:h-[50px] md:w-[118px] md:h-[78px] opacity-80 group-hover:opacity-100"
                }`}
              />
            </div>
            <img
              src={product.image}
              alt={product.name}
              className={`relative z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-[135px] md:h-[135px] object-contain transition-transform ${
                isActive ? "scale-100" : "scale-90 group-hover:scale-95"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
