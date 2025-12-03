"use client";
// import { useDeviceType } from "@/hooks/useDeviceType";
import { review, scrollContent } from "@/utils/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";
import ScrollSection from "@/components/animations/ScrollSection";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
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

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const chars = blurTextRef.current.querySelectorAll(".char");

        // -------------------------------
        // TEXT 1 Animation
        // -------------------------------
        gsap
          .timeline()

          .fromTo(
            ".text1",
            { opacity: 0, scale: 0.8, y: device === "mobile" ? "40vh" : "" },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power1.inOut" }
          )
          .to(".text1", {
            y: device === "mobile" ? "2vh" : "-28vh",
            duration: 0.5,
            ease: "power1.inOut",
          })

          //         .fromTo(
          //   ".img",
          //   { opacity: 0, scale: 0.8, y: "50%" },
          //   { opacity: 1, scale: 1, y: 0, duration:0.5, ease: "power1.out" }
          // )

          .to(".productWrapperRef", {
            y:
              device === "mobile"
                ? "90%"
                : device === "tablet"
                ? "-20%"
                : "50%",
            scale: device === "mobile" ? 0.8 : device === "tablet" ? 0.8 : 1,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".heroSec1",
              start: "top-=64px top+=70px",
              end: "bottom+=100 center",
              scrub: true,
              // markers: true
            },
          })
          .to(productWrapperRef.current, {
            y:
              device === "mobile"
                ? "-8%"
                : device === "tablet"
                ? "-20%"
                : "-25%",
            x: device === "mobile" ? 0 : device === "tablet" ? 150 : 330,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".heroSec3",
              start: "top bottom", // When top of the content hits bottom of the viewport
              end: "top center",
              scrub: true,
              // markers: true
            },
          });

        // -------------------------------
        // CHARS BLUR Animation
        // -------------------------------
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
              pin: true,
              pinSpacing: true,
            },
          }
        );

        // -------------------------------
        // PIN FIRST PRODUCT SECTION
        // -------------------------------
        ScrollTrigger.create({
          trigger: ".product-pin-section",
          start: "center-=52px center",
          endTrigger: ".sectionEnd",
          end: "bottom-=170 top",
          pin: true,
          pinType: "transform",
          pinSpacing: false,
        });

        // -------------------------------
        // PIN EACH SCROLL SECTION AFTER
        // -------------------------------
        scrollRefs.current.forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top+=64px",
            end: "bottom top",
            pin: true,
            pinType: "transform",
            pinSpacing: scrollRefs.current.length === 5 ? true : false,
          });
        });

        // -------------------------------
        // PRODUCT INITIAL ANIMATION
        // -------------------------------

        // gsap.timeline()

        //   .to(".productWrapperRef", {
        //     y:
        //       device === "mobile"
        //         ? "90%"
        //         : device === "tablet"
        //         ? "-20%"
        //         : "50%",
        //     scale:
        //       device === "mobile"
        //         ? 0.8
        //         : device === "tablet"
        //         ? 0.8
        //         : 1,
        //     ease: "power1.inOut",
        //     scrollTrigger: {
        //       trigger: ".heroSec1",
        //       start: "top-=64px top+=70px",
        //       end: "bottom+=100 center",
        //       scrub: true,
        //       markers: true
        //     },
        //   })
        //   .to(productWrapperRef.current, {
        //     y:
        //       device === "mobile"
        //         ? "-8%"
        //         : device === "tablet"
        //         ? "-20%"
        //         : "-25%",
        //     x:
        //       device === "mobile"
        //         ? 0
        //         : device === "tablet"
        //         ? 150
        //         : 330,
        //     ease: "power1.inOut",
        //     scrollTrigger: {
        //       trigger: ".heroSec2",
        //       start: "center+=100 center+=100",
        //       end: "center top",
        //       scrub: true,
        //     },
        //   });

        // hand movement
        gsap.to(handRef.current, {
          y: 1000,
          autoAlpha: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".heroSec1",
            start: "top-=50px top+=35px",
            end: "bottom bottom-=30%",
            scrub: true,
            // markers: true
          },
        });

        // refresh AFTER all triggers created
        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    },

    {
      scope: containerRef,
      dependencies: [device],
    }
  );

  // Proven botanical ingredients you can trust.
  // Less clutter. Better hair. Smarter care.

  // SINGLE sentence (for mobile)
  const oneLine =
    "Proven botanical ingredients you can trust. Less clutter. Better hair. Smarter care.";

  // TWO sentence layout (for desktop)
  const line1 = "Proven botanical ingredients you can trust.";
  const line2 = "Less clutter. Better hair. Smarter care.";

  return (
    <section className="relative" ref={containerRef}>
      <div className="h-full w-full">
        <div className=" section h-[calc(100vh-64px)] w-full flex flex-col sm:flex-row items-center justify-between heroSec1">
          {/* <div className="text1 opacity-0 w-full"> */}
          <div className="text1 opacity-0 flex-1">
            <h1>
              Regrow, Revive & Nourish. Begin Your Hair Journey Here.
              {/* Your healthiest <br className="hidden sm:block" /> skin revealed. */}
            </h1>

            <div className="hiddenContent  mt-6 space-y-3">
              <div className="grid grid-cols-6 w-5/12 md:w-3/12">
                {review.map((item, index) => (
                  <div
                    key={index}
                    className="relative border-2 border-white w-[40px] h-[40px]  rounded-md overflow-hidden"
                  >
                    <Image
                      className="object-cover"
                      src={item.profileImg}
                      fill
                      alt={item.profileImg}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-1 items-center ">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    src="/star.svg"
                    width={12}
                    height={12}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-xs">2500+ five-star reviews</p>
            </div>
          </div>

          {/* <div className="flex-1 z-1" ref={productWrapperRef}>
            <div className="flex flex-col items-center justify-center product-pin-section img">
              <div className="relative lg:w-[500px] lg:h-[500px] md:w-[250px] md:h-[280px] w-[280px] h-[250px] productWrapperRef">
                <Image
                  
                  className="object-contain"
                  src="/bottle.png"
                  fill
                  alt="Product"
                />
              </div>
            </div>
          </div> */}

          <div className="flex-1"></div>

          <div className="flex-1">
            <div className="flex justify-end">
              <div className="w-3/6 text-end">
                <h5 className="md:block hidden">
                  We strip away the unnecessary to focus on what truly works.
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="section h-[calc(100vh-64px)] flex items-start justify-center w-full heroSec2 relative ">
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
        <div className="heroSec3">
          {scrollContent.map((item, index) => (
            <div
              key={index}
              className="h-[calc(100vh-64px)] flex items-start md:items-center bg-section section z-0"
              ref={addToRefs}
            >
              <div className="container flex">
                {/* <div className="sm:w-6/12 flex items-center bg-red-200"> */}
                <div className="flex-1  ">
                  {/* <div className="bg-[#D4DCCF] text-xs w-fit py-1 px-3 rounded-md">
                    0{index + 1}
                  </div> */}
                  <div className="flex items-center gap-4">
                    <div className="relative rounded-full min-h-[100px] min-w-[100px] md:min-h-[150px] md:min-w-[150px] overflow-hidden">
                      <Image
                      className="object-cover"
                        src={item.img}
                        // width={200}
                        // height={200}
                        fill
                        alt={item.title}
                      />
                    </div>
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="text-lg mb-2">{item?.info}</p>
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1"></div>
              </div>
            </div>
          ))}
        </div>

        {/* <ScrollSection /> */}

        <div className="sectionEnd h-[calc(100vh-64px)]"></div>
      </div>

      <div
        className="absolute top-0 left-0 h-[calc(100vh-64px)] w-full flex flex-col justify-end items-center "
        ref={productWrapperRef}
      >
        <div className="flex flex-col items-center justify-center product-pin-section img">
          <div className="relative lg:w-[500px] lg:h-[500px] md:w-[250px] md:h-[280px] w-[280px] h-[250px] productWrapperRef">
            <Image
              className="object-contain"
              src="/bottle1.png"
              fill
              alt="Product"
            />
          </div>
        </div>
        <div className="relative w-full max-w-[1200px] md:max-w-[900px] sm:max-w-[700px] aspect-[1396/686] mx-auto img">
          <Image
            ref={handRef}
            className="object-contain object-bottom"
            src="/hand.avif"
            fill
            alt="Product"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
