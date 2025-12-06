"use client";

import { slide } from "@/utils/constant";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useDeviceType } from "@/hooks/useDeviceType";
import ButtonBg from "@/components/common/ButtonBg";

gsap.registerPlugin(ScrollTrigger);

const StackedCards = () => {
  const containerRef = useRef(null);
  const stackedSectionRef = useRef(null);
  const cardsRef = useRef([]);
  const device = useDeviceType();

  // Track mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Reset cardsRef on each render
  cardsRef.current = [];

  useGSAP(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackedSectionRef.current,
          start: "top top+=60px",
          end: `+=${slide.length * 500}`,
          scrub: true,
          pin: true,
          // markers: true,
        },
      });

      const cards = cardsRef.current;

      for (let i = 0; i < cards.length; i++) {
        const topCard = cards[i];
        const remainingCards = cards.slice(i + 1);

        // Move top card up and fade (skip last card)
        if (i < cards.length - 1) {
          tl.to(
            topCard,
            {
              y: -500,
              opacity: 0,
              ease: "power2.inOut",
              duration: 1,
            },
            "+=0.2"
          );
        }

        // Shift remaining cards forward in the stack
        remainingCards.forEach((card, idx) => {
          const targetX = device === "mobile" ? 0 : idx * 45;
          const targetScale = device === "mobile" ? 1 : 1 - idx * 0.1;

          tl.to(
            card,
            {
              x: targetX,
              scale: targetScale,
              ease: "power2.inOut",
              duration: 2,
            },
            "<" // animate at the same time as top card
          );
        });
      }
    });

    return () => ctx.revert();
  }, [mounted, device]);

  return (
    <div className="section mt-20" ref={containerRef}>
      <div
        ref={stackedSectionRef}
        className=" container h-[calc(100vh-60px)] grid grid-cols-1 md:grid-cols-2 md:items-center gap-5 md:gap-10 "
      >
        <div>
          <h4 className="">
            {/* Your new skincare <br /> routine is beautifully <br /> simple. */}
            Follow 4 simple steps <br /> to verify the original <br />{" "}
            <span className="text-secondary">Neo Hair Lotion</span>
          </h4>

          <div className="mt-10">
            <ButtonBg>Verify Product</ButtonBg>
          </div>
        </div>

        <div className="relative md:w-[440px] md:h-[580px] min-h-[400px]">
          {slide.map((item, i) => {
            const scale = !mounted ? 1 : device === "mobile" ? 1 : 1 - i * 0.1;
            const offset = !mounted ? 0 : device === "mobile" ? 0 : i * 45;

            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="w-full h-full rounded-2xl absolute top-0 left-0 overflow-hidden  shadow-2xl bg-section"
                style={{
                  zIndex: slide.length - i,
                  transform: `translateX(${offset}px) scale(${scale})`,
                }}
              >
                <div className="relative h-[60%] md:h-[65%]  flex items-center justify-center p-4">
                  <div className="relative w-[300px] h-[100%]">
                    <Image
                      className="object-contain"
                      src={item.img}
                      // width={300}
                      // height={300}
                      fill
                      alt={item.label}
                    />
                  </div>
                </div>

                <div className="h-[40%] md:h-[35%] bg-primary p-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="pill">Step 0{i + 1}</div>
                    <h6 className="font-semibold text-white mt-6">
                      {item.label}
                    </h6>
                    <p className="text-white mt-2 text-center text-xs md:text-base">
                      {item.content}
                    </p>
                  </div>
                </div>

                {/* <div className="relative w-full h-full">
                  <Image
                    className="object-cover"
                    src={item.img}
                    fill
                    alt={item.label}
                  />
                  <div className="absolute z-10 w-full h-full flex items-end p-6 ">
                    <div>
                      <div className="pill">Step 0{i + 1}</div>
                      <h5 className="font-semibold text-white mt-2">{item.label}</h5>
                      <p className="text-white mt-3">{item.content}</p>
                    </div>
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
