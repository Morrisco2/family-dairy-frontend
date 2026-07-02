import React from "react";

const BackgroundGradient = () => {
  return (
    <div className="z-0 overflow-hidden ">
      <div
        className="
      absolute
      -top-24
      -left-24
      w-56
      h-56
      rounded-[45%_55%_50%_50%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    ">
        <div
          className="
        absolute
        inset-5
        rounded-[50%_45%_55%_50%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
      {/* Bottom Right Blob */}
      <div
        className="
      absolute
      -bottom-24
      -right-24
      w-56
      h-56
      rounded-[50%_45%_55%_45%]
      bg-[#6BA8E5]
      blur-[70px]
      opacity-60
      animate-floating-blob
      pointer-events-none
      z-0
    "
        style={{
          animationDelay: "2s",
        }}>
        <div
          className="
        absolute
        inset-5
        rounded-[45%_55%_50%_55%]
        bg-[#8CC6FF]
        blur-[40px]
        opacity-80
      "
        />
      </div>
    </div>
  );
};

export default BackgroundGradient;
