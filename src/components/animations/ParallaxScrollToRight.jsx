"use client";
import { scrollContent } from "@/utils/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallelScrollToRight = () => {
  const containerRef = useRef(null);
  const productWrapperRef = useRef(null);
  const scrollRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !scrollRefs.current.includes(el)) scrollRefs.current.push(el);
  };

useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom+=300 top", // extend scroll duration
      scrub: true,
      pin: true,
      // markers: true
    },
  });

  // Fade in initial text
  tl.to(".text1", { opacity: 1, ease: "power1.inOut", duration: 1 });

  // Move product down smoothly
  tl.to(productWrapperRef.current, { y: 350, ease: "power1.inOut", duration: 1 }, "<");

  // Fade in hidden text
  tl.to(".hiddenText", { opacity: 1, ease: "power1.inOut", duration: 1 }, "<");

  // Move product down-right
  tl.to(productWrapperRef.current, { x: 250, y: -50, ease: "power1.inOut", duration: 1 });
});


  return (
    <section className="relative">

      {/* ---------------- SECTION 1 ---------------- */}
      <div className="relative h-[calc(100vh-380px)] w-full">
        <h1 className="text1 opacity-0 translate-y-[38vh]">
          Your healthiest <br /> skin revealed.
        </h1>
      </div>

      {/* ---------------- SECTION 2 ---------------- */}
      <div
        ref={containerRef}
        className="flex items-start justify-center h-[88vh]"
      >
        <h1 className="hiddenText opacity-0">HiddenText</h1>
      </div>

      {/* ---------------- SCROLL SECTIONS ---------------- */}
      {scrollContent.map((item, index) => (
        <div
          key={index}
          className="h-screen bg-red-200 flex items-center"
          ref={addToRefs}
        >
          <div className="w-8/12 mx-auto">
            <div className="w-4/12">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}

      {/* ---------------- PRODUCT IMAGE ---------------- */}
      <div
        ref={productWrapperRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src="/products/product2.avif"
          width={300}
          height={300}
          alt="Product"
        />
      </div>
    </section>
  );
};

export default ParallelScrollToRight;
