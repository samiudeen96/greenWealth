"use client";
import { review, scrollContent } from "@/utils/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const Test = () => {
  const containerRef = useRef(null);
  const blurTextRef = useRef(null);
  const productWrapperRef = useRef(null);
  const scrollRefs = useRef([]);

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
            y: device === "mobile" ? "0vh" : "-28vh",
            duration: 0.5,
            ease: "power1.inOut",
          });

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

        // 1) FIRST SCROLL TRIGGER – heroSec1: move image into "down" position
        gsap.fromTo(
          productWrapperRef.current,
          {
            y: 0,
            x: 0,
            scale: 1,
          },
          {
            y: device === "mobile" ? "90%" : device === "tablet" ? "-20%" : "50%",
            x: 0,
            scale: device === "mobile" ? 0.8 : device === "tablet" ? 0.8 : 0.6,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".heroSec1",
              start: "top top+=60px",   // when heroSec1 hits top of viewport
              end: "bottom top",  // until heroSec1 scrolls out at top
              scrub: true,
              markers: true,
            },
          }
        );

        gsap.fromTo(
          "#productWrapperRef",
          {
            y: 0,
            x: 0,
            // scale: device === "mobile" ? 0.8 : device === "tablet" ? 0.8 : 0.6,
          },
          {
            y: device === "mobile" ? "-30%" : device === "tablet" ? "-20%" : "-100%",
            x: device === "mobile" ? 0 : device === "tablet" ? 150 : 330,
            scale: device === "mobile" ? 1 : 1.6,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".heroSec3",
              start: "top bottom",  // when TOP of heroSec3 hits BOTTOM of viewport
              end: "top center",    // finishes as top of heroSec3 reaches center
              scrub: true,
              // markers: true,
            },
          }
        );


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
        // PIN EACH SCROLL SECTION AFTER
        // -------------------------------
        scrollRefs.current.forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top+=60px",
            end: "bottom top",
            pin: true,
            // pinType: "transform",
            // pinSpacing: scrollRefs.current.length === 5 ? true : false,
            pinSpacing: false,
          });
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

  // SINGLE sentence (for mobile)
  const oneLine =
    "Proven botanical ingredients you can trust. Less clutter. Better hair. Smarter care.";

  // TWO sentence layout (for desktop)
  const line1 = "Proven botanical ingredients you can trust.";
  const line2 = "Less clutter. Better hair. Smarter care.";

  return (
    <section className="relative" ref={containerRef}>
      <div className="h-full w-full heroMainWrapper">
        {/* HERO SECTION 1 */}
        <div className="section h-[calc(100vh-60px)] w-full flex flex-col sm:flex-row items-center justify-between heroSec1">
          <div className="text1 opacity-0 flex-1">
            <h1>
              Regrow, Revive &amp; Nourish. Begin Your Hair Journey Here.
            </h1>

            <div className="hiddenContent mt-6 space-y-3">
              <div className="grid grid-cols-6 w-5/12 md:w-3/12">
                {review.map((item, index) => (
                  <div
                    key={index}
                    className="relative border-2 border-white w-[40px] h-[40px] rounded-md overflow-hidden"
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

              <div className="flex gap-1 items-center">
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

          {/* PRODUCT IMAGE / PINNED SECTION */}
          <div className="flex-1 z-1">
            <div className="flex flex-col items-center justify-center product-pin-section img">
              <div
                ref={productWrapperRef}
                className="
                
                  relative 
                  lg:w-[600px] lg:h-[600px]
                  md:w-[250px] md:h-[280px]
                  w-[250px] h-[280px]
                "
              >
                <Image
                  
                  id="productWrapperRef"
                  className="object-contain"
                  src="/bottle1.png"
                  fill
                  alt="Product"
                  sizes="(max-width: 768px) 250px,
                          (max-width: 1024px) 280px,
                          600px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT TEXT ON DESKTOP */}
          <div className="flex-1 md:block hidden">
            <div className="flex justify-end">
              <div className="w-3/6 text-end">
                <h5>
                  We strip away the unnecessary to focus on what truly works.
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECTION 2 – BLUR TEXT */}
        <div className="section h-[calc(100vh-60px)] flex items-start justify-center w-full heroSec2 relative">
          <h3 ref={blurTextRef} className="leading-[75px] text-center">
            {/* DESKTOP (md and up): Two lines */}
            <span className="hidden md:inline-block">
              <span className="flex flex-wrap justify-center gap-2">
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

        {/* ---------------- SCROLL SECTIONS (heroSec3) ---------------- */}
        <div className="heroSec3 bg-section">
          {scrollContent.map((item, index) => (
            <div
              key={index}
              className="h-[calc(100vh-60px)] flex items-start md:items-center section z-0 bg-section"
              ref={addToRefs}
            >
              <div className="container flex">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="relative rounded-full min-h-[100px] min-w-[100px] md:min-h-[150px] md:min-w-[150px] overflow-hidden">
                      <Image
                        className="object-cover"
                        src={item.img}
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
                <div className="flex-1"></div>
              </div>
            </div>
          ))}
        </div>

        {/* END SECTION */}
        <div className="sectionEnd h-[calc(100vh-60px)]"></div>
      </div>
    </section>
  );
};

export default Test;
