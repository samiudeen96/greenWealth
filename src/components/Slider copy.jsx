"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ images }) => {
  const splideRef = useRef(null);

  // const goNext = () => splideRef.current?.splide.go("+1");
  // const goPrev = () => splideRef.current?.splide.go("-1");

  return (
    // <div className="grid grid-cols-12 items-center">
    <div>
      {/* Left Arrow */}
      {/* <button
        onClick={goPrev}
        className="bg-white shadow rounded-full flex items-center justify-center w-10 h-10 hover:bg-gray-100 col-span-1"
      >
        <MdChevronLeft size={24} />
      </button> */}

      {/* Slider */}
      <div className="col-span-10 p-5 fadeOutUp">
        <Splide
          ref={splideRef}
          options={{
            perPage: 1,
            arrows: true,
            pagination: false,
            speed: 600,
            rewind: true,
          }}
          className="w-full"
        >
          {images.map((item, index) => (
            <SplideSlide key={index}>
              <div className="relative w-full aspect-[4/4] rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={`product-${index}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         520px"
                  priority
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Right Arrow */}
      {/* <button
        onClick={goNext}
        className="bg-white shadow rounded-full flex items-center justify-center w-10 h-10 hover:bg-gray-100 col-span-1"
      >
        <MdChevronRight size={24} />
      </button> */}
    </div>
  );
};

export default Slider;
