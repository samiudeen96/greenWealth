"use client";
import { useDeviceType } from "@/hooks/useDeviceType";
import { scrollContent } from "@/utils/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const blurTextRef = useRef(null);
  const productWrapperRef = useRef(null);
  const scrollRefs = useRef([]);
  const handRef = useRef(null);

  const device = useDeviceType();
  // "xs-mobile" / "mobile" / "tablet" / "laptop" / "desktop" / "large-desktop"

  const addToRefs = (el) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  useGSAP(() => {
    const chars = blurTextRef.current.querySelectorAll(".char");

    gsap
      .timeline()
      .fromTo(
        ".text1",
        { opacity: 0, y: "0%" }, // start centered
        { opacity: 1, duration: 1, ease: "power1.inOut" }
      )
      .to(".text1", {
        y: "-35vh", // move to very top
        duration: 1.4,
        ease: "power1.inOut",
      });

    // Product initial scroll animation
    gsap.fromTo(
      productWrapperRef.current,
      {
        yPercent: -28, // initially move it up by 50% of its own height (center vertically)
        xPercent: -50, // center horizontally
        top: "28%", // ensure it starts at 50% of parent
        left: "50%", // ensure it starts at 50% horizontally
        position: "absolute", // needed for top/left positioning
      },
      {
        yPercent: 58,
        top: "58%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".heroSec1",
          start: "top-=128px",
          end: "bottom center+=200px",
          scrub: true,
          // markers: true,
        },
      }
    );

    gsap.fromTo(
      chars,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".productWrapperRef",
          start: "bottom center+=220px",
          end: "bottom center",
          scrub: true,
          pin: true,
          // markers: true,
        },
      }
    );


        gsap.to(
      ".productWrapperRef",
      {
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pinBlurTextRef",
          start: "top+=64px",
          end: "bottom center",
          scrub: true,
          pin: true,
          // markers: true,
        },
      }
    );


    gsap.to(productWrapperRef.current, {
      x: 250,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".section-scroll-trigger",
        start: "bottom center",    
        end: "top center", 
        scrub: true,
        pin: true,
        markers: true,
        pinSpacing: false
        
      },
    });



  });


  // SINGLE sentence (for mobile)
  const oneLine =
    "Five proven ingredients that actually work. Less bottles. Better skin. Smarter routine.";

  // TWO sentence layout (for desktop)
  const line1 = "Five proven ingredients that actually work.";
  const line2 = "Less bottles. Better skin. Smarter routine.";

  return (
    <section className="relative">
      {/* ---------------- SECTION 1 ---------------- */}
      {/* <div className="hidden handRef"></div> */}
      <div className=" z-0 relative heroSec1">
        <div
          className=" section h-[calc(100vh-64px)] w-full flex items-center justify-between"
          ref={handRef}
        >
          <h1 className="text1 opacity-0">
            Your healthiest <br /> skin revealed.
          </h1>
        </div>

      <div className="absolute top-0 h-[calc(100vh-64px)] flex items-center justify-center pinBlurTextRef w-full">
        <h3 ref={blurTextRef} className="leading-[75px] text-center">
          {/* DESKTOP (md and up): Two lines */}
          <span className="hidden md:inline-block">
            <span className="flex flex-wrap justify-center gap-2 ">
              {line1.split(" ").map((word, i) => (
                <span key={i} className="word inline-flex">
                  {word.split("").map((char, j) => (
                    <span key={j} className="char inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </span>

            <span className="flex flex-wrap justify-center gap-2">
              {line2.split(" ").map((word, i) => (
                <span key={i} className="word inline-flex">
                  {word.split("").map((char, j) => (
                    <span key={j} className="char inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>

          {/* MOBILE (smaller than md): Single line */}
          <span className="md:hidden inline-flex flex-wrap gap-2 justify-center">
            {oneLine.split(" ").map((word, i) => (
              <span key={i} className="word inline-flex">
                {word.split("").map((char, j) => (
                  <span key={j} className="char inline-block opacity-0">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h3>
      </div>

      </div>

      {/* ---------------- PRODUCT IMAGE ---------------- */}
      <div className="absolute top-0 left-0 z-0  h-[calc(100vh-64px)] w-full  productWrapperRef">

        <div
          className="relative lg:w-[500px] lg:h-[500px] md:w-[250px] md:h-[280px] w-[280px] h-[250px] "
          ref={productWrapperRef}
        >
          <Image
            className="object-contain"
            src="/bottle.png"
            fill
            alt="Product"
          />
        </div>
      </div>

      {/* ---------------- SCROLL SECTIONS ---------------- */}
      <div className="section-scroll-trigger bg-black/10">
              {scrollContent.map((item, index) => (
        <div
          key={index}
          className="h-screen flex items-center "
          ref={addToRefs}
        >
          <div className="container">
            <div className="sm:w-4/12">
              <div className="bg-[#D4DCCF] text-xs w-fit py-1 px-3 rounded-md">0{index + 1}</div>
              <h4 className="mt-3 mb-5">{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
      </div>



      <div className="fixed bottom-10 right-10 text-red-800">{device}</div>
    </section>
  );
};

export default Hero;
