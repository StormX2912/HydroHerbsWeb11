import Navigation from "@/components/Navigation";
import ProductMenu from "@/components/ProductMenu";
import { useMagicLampAnimation } from "@/hooks/useMagicLampAnimation";

export default function SkinGlowBlend() {
  const isAnimating = useMagicLampAnimation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#DF758A]" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full bg-[#E28297] opacity-100"
            style={{
              width: "120px",
              marginLeft: i === 0 ? "0" : "calc((100vw - 1612px) / 24 + 10px)",
              marginRight: "calc((100vw - 1612px) / 24 + 10px)",
            }}
          />
        ))}
      </div>

      <div className="absolute top-[247px] right-[156px] w-[585px] h-[585px] rounded-full bg-[#F64565] blur-[100px] opacity-100 pointer-events-none hidden xl:block" />

      <Navigation />
      <ProductMenu />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <h1 className={`font-teko text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-bold leading-none text-white uppercase tracking-tight ${
                isAnimating ? "animate-text-scroll" : ""
              }`}>
                Skin Glow Blend
              </h1>
            </div>

            <div className="space-y-6">
              <p className={`font-akatab font-normal text-lg md:text-xl leading-relaxed text-white/85 ${
                isAnimating ? "animate-text-scroll" : ""
              }`} style={isAnimating ? { animationDelay: "0.1s" } : {}}>
                The Skin Glow Blend enhances your natural radiance by keeping the skin hydrated,
                clear, and refreshed. Its tart, floral taste with subtle hints of lemon and rose offers
                a light, uplifting experience that feels as rejuvenating as it tastes.{" "}
                <span className="font-bold">
                  Main ingredients: Rose petals, hibiscus, moringa leaves, lemongrass
                </span>
              </p>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1ba3c3b0fadf0b654a8ab71f5450ec11e9dadd85?width=774"
                alt="Rose decoration"
                className={`absolute w-32 md:w-48 lg:w-64 xl:w-80 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-200px",
                  left: "-5%",
                  transform: "rotate(-59.718deg)",
                  animationDelay: "0s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fcdc5655c8700c6a23ab5365ed1b00d4a230b2f6?width=774"
                alt="Rose decoration"
                className={`absolute w-32 md:w-48 lg:w-64 xl:w-80 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-180px",
                  right: "10%",
                  transform: "rotate(-59.718deg)",
                  animationDelay: "0.1s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/019bf154f8be281d5dbcaf066e53377bd471d23e?width=731"
                alt="Rose decoration"
                className={`absolute w-32 md:w-48 lg:w-60 xl:w-72 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-150px",
                  right: "15%",
                  transform: "rotate(-59.718deg)",
                  animationDelay: "0.2s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0668ceddc7354acab6b77bad9f4d7206ff4e179c?width=769"
                alt="Rose decoration"
                className={`absolute w-32 md:w-48 lg:w-64 xl:w-80 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-220px",
                  right: "20%",
                  transform: "rotate(-73.227deg)",
                  animationDelay: "0.15s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/df91f9dceee6a48712c3cbc50b353cd83c435d5b?width=679"
                alt="Moringa leaves"
                className={`absolute w-32 md:w-48 lg:w-60 xl:w-72 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-160px",
                  right: "25%",
                  transform: "rotate(-51.287deg)",
                  animationDelay: "0.25s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5b7422c262df01e46d2bdc35d57bb431d730ec48?width=220"
                alt="Lemongrass"
                className={`absolute w-16 md:w-24 lg:w-28 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-140px",
                  left: "15%",
                  transform: "rotate(-29.305deg)",
                  animationDelay: "0.3s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2a61e50a6479c3ae6ab277729578f9ad25dbca22?width=342"
                alt="Hibiscus"
                className={`absolute w-20 md:w-32 lg:w-36 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-170px",
                  right: "25%",
                  transform: "rotate(-95.235deg)",
                  animationDelay: "0.35s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/821464b5b14b3cf2f9baee5fb2ec9c5912525596?width=1200"
                alt="Skin Glow Blend Product"
                className={`relative z-10 w-64 md:w-80 lg:w-96 xl:w-[500px] object-contain drop-shadow-2xl ${
                  isAnimating ? "animate-magic-lamp-bottle" : ""
                }`}
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
