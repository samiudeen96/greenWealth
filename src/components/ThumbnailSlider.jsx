"use client";

import Image from "next/image";
import { useState } from "react";


const ThumbnailSlider = ({ images = [] }) => {
  const safeImages = images.length ? images : [{ image: "/fallback.png" }];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = safeImages[activeIndex];

  return (
    <div className="flex gap-6">
      {/* LEFT: Vertical thumbnails */}
      <div className="flex flex-col gap-3 w-20">
        {safeImages.map((img, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative w-full aspect-[4/4] rounded-xl border transition 
                overflow-hidden bg-white
                ${
                  isActive
                    ? "border-gray-900 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <Image
                src={img.image}
                alt={`thumbnail-${index}`}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button> 
          );
        })}
      </div>

      {/* RIGHT: Main image */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* soft circle background like the design */}
        {/* <div className="absolute inset-10 rounded-full bg-gray-100" /> */}

        <div className="relative w-full max-w-[420px] aspect-square">
          <Image
            src={activeImage.image}
            alt="main-product"
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 80vw, 420px"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ThumbnailSlider;
