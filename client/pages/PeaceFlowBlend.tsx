import Navigation from "@/components/Navigation";
import ProductMenu from "@/components/ProductMenu";
import { useMagicLampAnimation } from "@/hooks/useMagicLampAnimation";

export default function PeaceFlowBlend() {
  const isAnimating = useMagicLampAnimation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#D5B68B]" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-full bg-[#D9BD96] opacity-100"
            style={{
              width: "120px",
              marginLeft: i === 0 ? "0" : "calc((100vw - 1617px) / 24 + 10px)",
              marginRight: "calc((100vw - 1617px) / 24 + 10px)",
            }}
          />
        ))}
      </div>

      <div className="absolute top-[247px] right-[156px] w-[585px] h-[585px] rounded-full bg-[#FFCB5C] blur-[100px] opacity-100 pointer-events-none hidden xl:block" />

      <Navigation />
      <ProductMenu />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <h1 className={`font-teko text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-bold leading-none text-white uppercase tracking-tight ${
                isAnimating ? "animate-text-scroll" : ""
              }`}>
                Peace Flow Blend
              </h1>
            </div>

            <div className="space-y-6">
              <p className={`font-akatab text-lg md:text-xl leading-relaxed text-white/85 ${
                isAnimating ? "animate-text-scroll" : ""
              }`} style={isAnimating ? { animationDelay: "0.1s" } : {}}>
                Specially crafted to support smooth digestion, ease bloating and discomfort.
                Its sweet-spicy flavor with a touch of mint and ginger leaves you feeling warm,
                refreshed, and restored from within.{" "}
                <span className="font-bold">
                  Main ingredients: Fennel seeds, ginger, mint leaves, licorice dandelion root
                </span>
              </p>
            </div>
          </div>

          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6427bcc0cb42ec39bdd69f5340ec550fa2706229?width=3974"
                alt="Fennel decoration"
                className={`absolute w-64 md:w-96 lg:w-[500px] opacity-60 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-300px",
                  left: "-10%",
                  transform: "rotate(-8.685deg)",
                  animationDelay: "0s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c00e90904d690e051670295189a57738bae2a96a?width=469"
                alt="Dandelion"
                className={`absolute w-20 md:w-32 lg:w-40 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-200px",
                  right: "15%",
                  transform: "rotate(57.643deg)",
                  animationDelay: "0.1s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6166e7677babb06b5f793a09010c56b5805871a1?width=366"
                alt="Dandelion"
                className={`absolute w-16 md:w-24 lg:w-32 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-180px",
                  left: "15%",
                  transform: "rotate(-54.514deg)",
                  animationDelay: "0.2s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/a5b302d1d5d3c04dad13930f03a11487a953f461?width=169"
                alt="Ginger"
                className={`absolute w-12 md:w-16 lg:w-20 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-160px",
                  left: "12%",
                  transform: "rotate(-134.486deg)",
                  animationDelay: "0.3s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/cb26ae59073e664f403f9450d8035f42027380eb?width=268"
                alt="Ginger"
                className={`absolute w-16 md:w-24 lg:w-28 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-190px",
                  right: "18%",
                  animationDelay: "0.15s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/28e3e3a70ef4a81617183fc82af9f92fb5f0240e?width=142"
                alt="Licorice"
                className={`absolute w-10 md:w-14 lg:w-16 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-170px",
                  right: "30%",
                  animationDelay: "0.25s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/6f8a2dfe0df07127c40b624d278ee4ba5cb70d8b?width=258"
                alt="Licorice"
                className={`absolute w-16 md:w-24 lg:w-28 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-210px",
                  left: "20%",
                  transform: "rotate(137.139deg)",
                  animationDelay: "0.05s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/dab489be0cb4a6e7b99b49501b7ccd0f359c7f01?width=1208"
                alt="Mint leaves"
                className={`absolute w-48 md:w-64 lg:w-80 opacity-90 ${
                  isAnimating ? "animate-magic-lamp-float" : ""
                }`}
                style={{
                  bottom: "-280px",
                  right: "22%",
                  animationDelay: "0.35s",
                }}
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/349447538d8bdda7b55c011fa5583dc27df96774?width=1219"
                alt="Peace Flow Blend Product"
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
