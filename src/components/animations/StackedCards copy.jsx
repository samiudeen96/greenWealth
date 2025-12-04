"use client";

import { slide } from "@/utils/constant";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGsapResponsive } from "@/hooks/useGsapResponsive";
import { useDeviceType } from "@/hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const StackedCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const device = useDeviceType();

  useGsapResponsive((device) => {
    let offsetMultiplier = 45;
    let yMove = -500;
    let scrollDistance = 400;

    if (device === "mobile") {
      offsetMultiplier = 20;
      yMove = -300;
      scrollDistance = 250;
    } else if (device === "tablet") {
      offsetMultiplier = 0;
      yMove = -400;
      scrollDistance = 300;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 64px",
        end: `+=${slide.length * scrollDistance}`,
        scrub: true,
        pin: true,
      },
    });

    const cards = cardsRef.current;

    // Loop through each card
    for (let i = 0; i < cards.length; i++) {
      const topCard = cards[i];
      const remainingCards = cards.slice(i + 1);

      // 1️⃣ Move top card up and fade (skip last card)
      if (i < cards.length - 1) {
        tl.to(
          topCard,
          {
            y: yMove,
            opacity: 0,
            ease: "power2.out",
            duration: 1,
          },
          "+=0.2"
        );
      }

      // 2️⃣ Align all remaining cards to front position (x:0, scale:1)
      remainingCards.forEach((card) => {
        tl.to(
          card,
          {
            x: 0,
            scale: 1,
            ease: "power2.out",
            duration: 2,
          },
          "<" // animate at same time as top card
        );
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className="container h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 px-4 md:px-0 " id="stacked"
    >
      <h4 className="text-2xl md:text-4xl leading-[40px] md:leading-[60px]">
        Your new skincare <br /> routine is beautifully <br /> simple.
      </h4>

      <div className="relative w-full max-w-[440px] h-[400px] md:h-[580px] mx-auto">
        {slide.map((item, i) => {
          const scale = 1 - i * 0.1;
          const offsetMultiplier = device === "mobile" ? 20 : device === "tablet" ? 30 : 45;
          const offset = i * offsetMultiplier;

          return (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="w-full h-full rounded-lg absolute top-0 left-0 overflow-hidden"
              style={{
                zIndex: slide.length - i,
                transform: `translateX(${offset}px) scale(${scale})`,
              }}
            >

              <div className="relative w-full h-full"> 
                <Image
                className="object-cover"
                src={item.img}
                fill
                alt={item.label}
              />
                <div className="absolute z-1w-full h-full flex items-end p-6 bg-black/15">
                  <div>
                    <div className="bg-[#D4DCCF] text-xs w-fit py-1 px-3 rounded-md">Step 0{i + 1}</div>
                    <h5 className="font-semibold semi-bold text-white mt-2">{item.label}</h5>
                  <p className="text-white mt-3">{item.content}</p>
                  </div>
                </div>
              </div>
              
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedCards;
