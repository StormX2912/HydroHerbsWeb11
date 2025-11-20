export default function OurStorySection() {
  return (
    <section className="relative w-full min-h-screen bg-[#FFFCF5] overflow-hidden flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Tea decoration - top right */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/d6752d30061ec8a0060608262d29fae4b11889cb?width=618"
        alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          width: "309px",
          height: "321px",
          top: "81px",
          left: "1023.2px",
          right: "clamp(50px, 15%, 320px)",
          transform: "15",
        }}
      />

      {/* Tea leaves decoration - top left */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/da4b020f057bdd53b01f55f7e6273ebdb86d5680?width=468"
        alt=""
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          width: "234px",
          height: "179px",
          top: "105px",
          left: "clamp(50px, 15%, 282px)",
          transform: "rotate(21.375deg)",
        }}
      />

      {/* Tea leaves decoration - bottom right */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/8c2cca88a8dcfa37d83880b83442d45b32b22b1b?width=511"
        alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          width: "256px",
          height: "224px",
          bottom: "clamp(50px, 10%, 209px)",
          right: "clamp(50px, 15%, 341px)",
          transform: "rotate(-6.303deg)",
          top: "763.8px",
        }}
      />

      {/* Large teacup image - left side */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fa4587839481b46c5a2a9f56ab2fc6cfe%2F184be882a9af4d8291f0dca765535f92"
        alt="Teacup"
        className="absolute pointer-events-none select-none hidden xl:block"
        style={{
          width: "1374px",
          height: "950.8px",
          left: "-680px",
          top: "37px",
          transform: "10",
          opacity: 0.8,
        }}
      />

      {/* Blur effect background */}
      <div
        className="absolute w-[815px] h-[815px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "#C2FF65",
          filter: "blur(100px)",
          top: "132px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[1097px] mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-4">
        <h2 className="font-akatab font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] text-[#2A1515] opacity-70 leading-tight lg:leading-[70px] mb-6 sm:mb-8 lg:mb-8 lg:ml-[130px]">
          Our Story
        </h2>

        <p className="font-akatab font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] text-black opacity-80 leading-relaxed lg:leading-[35px] max-w-full lg:max-w-[1090px] mx-auto lg:ml-[130px] px-4 sm:px-0">
          At HydroHerbs, we handcraft natural tea infusions designed to nourish
          your body and elevate your daily wellness. Our blends are made from
          carefully selected herbs, flowers and botanicals, chosen for their
          flavour, aroma and natural benefits. From digestion and immunity to
          skin glow and calmness, each infusion is created with purpose, clean,
          pure and full of nature's goodness. We believe wellness can be simple,
          delicious and sustainable, one cup at a time.
        </p>
      </div>
    </section>
  );
}
