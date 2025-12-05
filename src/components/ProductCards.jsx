import Image from "next/image";
import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const ProductCards = ({ item }) => {
  // take 1st image safely
  const mainImage = item.images?.[0]?.image ?? "/fallback.png"; // change fallback if needed

  return (
    <div className="bg-white flex flex-col rounded-lg overflow-hidden relative product-card">
      {/* IMAGE AREA */}
      <div className="relative w-full px-3 py-4 sm:px-4 sm:py-5 bg-muted rounded-lg">
        {/* Wishlist icon */}
        <button
          type="button"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 group cursor-pointer z-[1]"
        >
          <IoMdHeartEmpty
            size={22}
            className="text-gray-700 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
          />
          <IoMdHeart
            size={22}
            className="text-red-600 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </button>

        {/* Image container with aspect ratio */}
        <div className="relative w-full aspect-[4/4]">
          <Image
            className="object-contain"
            src={mainImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw,
                   (max-width: 1024px) 50vw,
                   (max-width: 1280px) 33vw,
                   25vw"
          />
        </div>
      </div>

      {/* TEXT AREA */}
      <div className="w-full px-3 py-3 sm:px-4 sm:py-4 gap-1">
        <p className="mt-1 font-semibold text-sm sm:text-base">
          {item.title}
        </p>
        <p className="text-primary text-xs sm:text-sm">{item.category}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm sm:text-base">{item.price}</p>
          <p className="text-sm sm:text-base line-through opacity-60">
            {item.offerPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
