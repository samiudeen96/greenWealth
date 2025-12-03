"use client";
// import { useDeviceType } from "@/hooks/useDeviceType";
import { scrollContent } from "@/utils/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const blurTextRef = useRef(null);
  const productWrapperRef = useRef(null);
  const scrollRefs = useRef([]);
  const handRef = useRef(null);

  const device = useDeviceType();

  const addToRefs = (el) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  useGSAP(() => { 
    const ctx = gsap.context(() => {
      const chars = blurTextRef.current.querySelectorAll(".char");

      // TEXT 1 Animation (Responsive Y movement)
      gsap
        .timeline()
        .fromTo(
          ".text1",
          { opacity: 0, y: "0%" },
          { opacity: 1, duration: 1, ease: "power1.inOut" }
        )
        .to(".text1", {
          y: device === "mobile" ? "-32vh" : "-28vh",
          duration: 1.4,
          ease: "power1.inOut",
        });

      // CHARS BLUR Animation (Responsive stagger + pin)
      gsap.fromTo(
        chars,
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: device === "mobile" ? 0.02 : 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".heroSec2",
            start:
              device === "mobile" ? "top-=90 top+=130" : "top-=200 top+=200",
            end: "bottom center",
            scrub: true,
            pin: true, // disable pin on mobile
            pinSpacing: true,
            // markers: true
          },
        }
      );

      // ScrollTrigger.create({
      //   trigger: ".product-pin-section",
      //   start: "top top",
      //   endTrigger: ".sectionEnd",
      //   end: "top top", // 🔥 Ensures it unpins exactly at sectionEnd
      //   pin: true,
      //   pinSpacing: true,
      //   pinType: "transform", // 🔥 REQUIRED for ScrollSmoother
      //   anticipatePin: 1,
      //   markers: true,
      // });

      // TOTAL height of all sections + first section
const sectionHeight = window.innerHeight + 48; // adjust if header exists
const totalHeight = (scrollRefs.current.length + 6) * sectionHeight;

ScrollTrigger.create({
  trigger: ".product-pin-section",
  start: "top top",
  // endTrigger: ".sectionEnd",
  end: "+=" + totalHeight, // pin until all sections scroll past
  pin: true,
  pinSpacing: true,
  pinType: "transform", // required if using ScrollSmoother
  // markers: true,
});


      // ✅ PIN EACH SCROLL SECTION AFTER product pin
      scrollRefs.current.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: device === "mobile" ? "top top+=80px" : "top top+=64px",
          end: "bottom top",
          pin: true,
          snap: 1,
          pinSpacing: true
        });
      });

      // PRODUCT INITIAL ANIMATION (Responsive start)

      gsap.fromTo(
        ".productWrapperRef",
        {
          yPercent: device === "mobile" ? 100 : device === "tablet" ? -30 : 28, // initial vertical offset
          // y: "22vh",
          xPercent: -50, // center horizontally
          left: "50%",
          position: "absolute",
        },
        {
          // yPercent: device === "mobile" ? 170 : device === "tablet" ? 35 : 30, // final vertical offset
          y:
            device === "mobile"
              ? "130%"
              : device === "tablet"
              ? "-20%"
              : "100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".heroSec1",
            start: "top-=64px top",
            end: "bottom+=100 center",
            scrub: true,
            // markers: true, // enable for debugging
          },
        }
      );

      gsap.to(productWrapperRef.current, {
        y: device === "mobile" ? "-20%" : device === "tablet" ? "-20%" : "-60%",
        x: device === "mobile" ? 0 : device === "tablet" ? 150 : 330,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".heroSec2",
          start: "center+=100 center+=100",
          end: "center top+=200",
          scrub: true,
          // markers: true,
        },
      });
    });

    ScrollTrigger.refresh(); // IMPORTANT

    return () => ctx.revert();
  }, [device]); // ✅ device added here

  // SINGLE sentence (for mobile)
  const oneLine =
    "Five proven ingredients that actually work. Less bottles. Better skin. Smarter routine.";

  // TWO sentence layout (for desktop)
  const line1 = "Five proven ingredients that actually work.";
  const line2 = "Less bottles. Better skin. Smarter routine.";

  return (
    <section className="relative">
      <div className="h-full w-full">
        <div
          className=" section h-[100vh] w-full flex items-center justify-between heroSec1"
          ref={handRef}
        >
          <h1 className="text1 opacity-0">
            Your healthiest <br /> skin revealed.
          </h1>
        </div>
        {/* </div> */}

        <div className="section h-[calc(100vh-56px)] flex items-start justify-center w-full heroSec2 relative ">
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

        {/* ---------------- SCROLL SECTIONS ---------------- */}
        <div className="heroSec3 section">
          {scrollContent.map((item, index) => (
            <div
              key={index}
              className="h-[calc(100vh-56px)] flex items-start md:items-center"
              ref={addToRefs}
            >
              <div className="container">
                <div className="sm:w-4/12">
                  <div className="bg-[#D4DCCF] text-xs w-fit py-1 px-3 rounded-md">
                    0{index + 1}
                  </div>
                  <h4 className="mt-3 mb-5">{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>

        </div>


      </div>
          {/* <div className="absolute top-0 left-0 w-full h-[100vh] flex justify-center product-pin-section ">
          <div className="relative lg:w-[500px] lg:h-[500px] md:w-[250px] md:h-[280px] w-[280px] h-[250px] productWrapperRef">
            <Image
              ref={productWrapperRef}
              className="object-contain"
              src="/bottle.png"
              fill
              alt="Product"
            />
          </div>
        </div> */}
    </section>
  );
};

export default Hero;
