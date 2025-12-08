"use client";

import { useRef, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import gsap from "gsap";

const Slider = ({ images = [] }) => {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);

  // Fallback if no images
  const safeImages = images.length ? images : [{ image: "/fallback.png" }];

  // Sync main & thumbs
  useEffect(() => {
    if (
      mainRef.current &&
      thumbsRef.current &&
      thumbsRef.current.splide &&
      mainRef.current.sync
    ) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const animate = () => {
    gsap.fromTo(
      ".fadeOut",
      { opacity: 0, scale: 0.4 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power1.inOut" }
      // { opacity: 0, scale: 0, y: "50vh" },
      // { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.inOut" }
    )
  }

  const goNext = () => {
    animate();
    thumbsRef.current?.splide.go("+1")

  };
  const goPrev = () => {
    animate();
    thumbsRef.current?.splide.go("-1")
  };

  return (
    <div className="fadeOutUp">
      {/* MAIN SLIDER */}
      <div className="col-span-10 p-5">
        <Splide
          ref={mainRef}
          options={{
            type: "loop",
            perPage: 1,
            arrows: false,
            pagination: false,
            speed: 600,
            rewind: true,
          }}
          className="w-full"
        >
          {safeImages.map((item, index) => (
            <SplideSlide key={index}>
              <div className="relative w-full aspect-[4/4] rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={`product-${index}`}
                  fill
                  className="object-contain fadeOut"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw, 
                         520px"
                  priority={index === 0}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* THUMBNAILS SLIDER */}
      <div className="px-5 relative">

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          className="bg-white absolute top-1/2 left-0 -translate-y-1/2 z-1
             shadow rounded-full flex items-center justify-center 
             w-10 h-10 hover:bg-gray-100"
        >
          <MdChevronLeft size={24} />
        </button>

        <Splide
          ref={thumbsRef}
          options={{
            fixedWidth: 70,
            fixedHeight: 70,
            gap: "0.75rem",
            rewind: false,
            pagination: false,
            isNavigation: true,   // 👈 makes this clickable for navigation
            focus: "center",
            arrows: false,
            cover: true,
            breakpoints: {
              640: {
                fixedWidth: 64,
                fixedHeight: 64,
              },
            },
          }}
          className="w-full"
        >
          {safeImages.map((item, index) => (
            <SplideSlide key={`thumb-${index}`}>
              <div className="relative w-full h-full rounded-md overflow-hidden border border-muted">
                <Image
                  src={item.image}
                  alt={`thumb-${index}`}
                  fill
                  className="object-contain"
                  sizes="70px"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          className="absolute top-1/2 right-0 bg-white -translate-y-1/2 z-1
             shadow rounded-full flex items-center justify-center 
             w-10 h-10 hover:bg-gray-100"
        >
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
