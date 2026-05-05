"use client";

import Lottie from "lottie-react";
// Import your downloaded JSON file verbatim
import incorrectData from "@/public/animations/incorrect-bear.json";

export default function IncorrectBear() {
  return (
    <div className="w-full h-full">
      <Lottie
        animationData={incorrectData}
        loop={true}
        autoplay={true}
        className="drop-shadow-[0_10px_20px_rgba(34,197,94,0.4)]"
      />
    </div>
  );
}
