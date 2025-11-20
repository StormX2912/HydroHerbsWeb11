export default function QuoteSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#FFFCF5] overflow-hidden flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Blur effect background */}
      <div
        className="absolute w-[400px] sm:w-[600px] md:w-[815px] h-[400px] sm:h-[600px] md:h-[815px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "#C2FF65",
          filter: "blur(100px)",
          top: "132px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />

      {/* Left Leaf */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/0025d577e01e8d8a73435eaa7d8672e015e8d3a6?width=1922"
        alt=""
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          width: "811px",
          height: "690px",
          objectFit: "contain",
          zIndex: 1,
          top: "-66px",
          left: "0",
        }}
      />

      {/* Right Leaf */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/68319433b218c7a4db13e39c5058bf849c3f79f0?width=2107"
        alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          width: "811px",
          height: "741px",
          objectFit: "contain",
          zIndex: 1,
          top: "330.3px",
          left: "541px",
        }}
      />

      {/* Text container */}
      <div className="relative z-10 max-w-[970px] mx-auto text-center px-4">
        <blockquote className="space-y-4 sm:space-y-6">
          <p className="font-akatab font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] leading-tight text-[#2A1515] opacity-70 px-0 md:px-0 md:ml-[59px]">
            "If you are cold, tea will warm you, if you are too heated, it will
            cool you, If you are depressed, it will cheer you and If you are
            excited, it will calm you."
          </p>
          <cite className="block font-akatab font-normal text-sm sm:text-base md:text-lg lg:text-[20px] text-[#2A1515] opacity-70 not-italic">
            ― William Ewart Gladstone
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
