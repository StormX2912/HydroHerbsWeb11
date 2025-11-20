import Navigation from "@/components/Navigation";
import ProductMenu from "@/components/ProductMenu";
import { useMagicLampAnimation } from "@/hooks/useMagicLampAnimation";

export default function HairVitalityBlend() {
  const isAnimating = useMagicLampAnimation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#7C1A8B]" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full bg-[#893197] opacity-100"
            style={{
              width: "120px",
              marginLeft: i === 0 ? "0" : "calc((100vw - 1614px) / 24 + 10px)",
              marginRight: "calc((100vw - 1614px) / 24 + 10px)",
            }}
          />
        ))}
      </div>

      <div className="absolute top-[247px] right-[156px] w-[585px] h-[585px] rounded-full bg-[#8F3A72] blur-[100px] opacity-100 pointer-events-none hidden xl:block" />

      <Navigation />
      <ProductMenu />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <h1 className={`font-teko text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-bold leading-none text-white uppercase tracking-tight ${
                isAnimating ? "animate-text-scroll" : ""
              }`}>
                Hair Vitality Blend
              </h1>
            </div>

            <div className="space-y-6">
              <p className={`font-akatab text-lg md:text-xl leading-relaxed text-white/85 ${
                isAnimating ? "animate-text-scroll" : ""
              }`} style={isAnimating ? { animationDelay: "0.1s" } : {}}>
                For stronger, healthier hair, the Hair Vitality Blend nourishes from root to tip,
                supporting growth and scalp vitality. With its earthy sweetness and gentle
                herbal notes, it brings a soothing balance to your daily self-care ritual.{" "}
                <span className="font-bold">
                  Main ingredients: Brahmi, nettle leaf, hibiscus, amla, rosemary
                </span>
              </p>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/32a16426f056e85b0beb0658b1239defc4ff32e5?width=1980"
                alt="Leaves decoration"
                className={`absolute w-64 md:w-96 lg:w-[500px] opacity-50 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-380px",
                  left: "-30%",
                  transform: "rotate(8.766deg)",
                  animationDelay: "0s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8bfb5fd8bdd6f12b74088a272c485042a4b6f908?width=1906"
                alt="Leaves decoration"
                className={`absolute w-64 md:w-96 lg:w-[480px] opacity-50 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-360px",
                  right: "-15%",
                  transform: "rotate(-145.793deg)",
                  animationDelay: "0.1s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/edf3486bbd7b1656ca7fe4a8eba8d41420b955a2?width=1405"
                alt="Leaves decoration"
                className={`absolute w-48 md:w-72 lg:w-[360px] opacity-50 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-300px",
                  left: "5%",
                  transform: "rotate(-87.149deg)",
                  animationDelay: "0.2s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c4a62cc87a8b6f7d21500fd6ad23f43f021351aa?width=278"
                alt="Amla"
                className={`absolute w-16 md:w-24 lg:w-28 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-180px",
                  left: "20%",
                  transform: "rotate(-43.459deg)",
                  animationDelay: "0.3s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1476a0e56c4dee6253d57f723b172c5f16fa7d4a?width=256"
                alt="Amla"
                className={`absolute w-16 md:w-24 lg:w-28 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-200px",
                  right: "8%",
                  animationDelay: "0.15s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1dfbf81bacef582cd951aafc2ad97e54f78c2b71?width=618"
                alt="Brahmi"
                className={`absolute w-32 md:w-48 lg:w-64 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-250px",
                  left: "12%",
                  transform: "rotate(-139.211deg)",
                  animationDelay: "0.05s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/9e8ff1e11e3643f90b17040e023c517b1a3a8816?width=352"
                alt="Rosemary"
                className={`absolute w-20 md:w-32 lg:w-36 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-200px",
                  right: "22%",
                  transform: "rotate(-55.437deg)",
                  animationDelay: "0.25s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/96d5b86a821ae10f56dfd63917d9ab1b6a060923?width=230"
                alt="Hibiscus"
                className={`absolute w-16 md:w-20 lg:w-24 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-180px",
                  left: "10%",
                  animationDelay: "0.35s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/af20c4b1cb2716d3c995d7a266cf3592def69b01?width=386"
                alt="Hibiscus"
                className={`absolute w-24 md:w-32 lg:w-40 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-220px",
                  right: "28%",
                  animationDelay: "0.12s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e5f35e225bcb1c8162e82172ca5b4d28f9a49fb0?width=218"
                alt="Hibiscus"
                className={`absolute w-16 md:w-20 lg:w-24 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-160px",
                  left: "18%",
                  transform: "rotate(31.175deg)",
                  animationDelay: "0.22s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/a5bff7412cddc9ae5fc39c045b166e1cf3fd232d?width=1200"
                alt="Hair Vitality Blend Product"
                className={`relative z-10 w-64 md:w-80 lg:w-96 xl:w-[500px] object-contain drop-shadow-2xl ${
                  isAnimating ? "animate-magic-lamp-bottle" : ""
                }`}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1e26152c2901c61e00aed43c02c23f32fb51c5e4?width=522"
                alt="Nettle"
                className={`absolute w-24 md:w-36 lg:w-44 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-220px",
                  right: "20%",
                  transform: "rotate(-29.588deg)",
                  animationDelay: "0.32s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6e987831253126cb5faf39d2f20addc49f974de1?width=352"
                alt="Hibiscus"
                className={`absolute w-20 md:w-28 lg:w-36 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-190px",
                  right: "22%",
                  transform: "rotate(9.081deg)",
                  animationDelay: "0.28s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes magic-lamp-bottle {
          0% {
            opacity: 0;
            transform: translateY(200px) rotate(30deg) scale(0.6);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
        }

        @keyframes magic-lamp-float {
          0% {
            opacity: 0;
            transform: translateY(200px) scale(0.6);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes text-scroll {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-magic-lamp-bottle {
          animation: magic-lamp-bottle 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-magic-lamp-float {
          animation: magic-lamp-float 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-text-scroll {
          animation: text-scroll 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
}
