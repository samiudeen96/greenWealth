"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HiddenTextReveal = () => {
  const containerRef = useRef(null);

  // SINGLE sentence (for mobile)
  const oneLine =
    "Five proven ingredients that actually work. Less bottles. Better skin. Smarter routine.";

  // TWO sentence layout (for desktop)
  const line1 = "Five proven ingredients that actually work.";
  const line2 = "Less bottles. Better skin. Smarter routine.";

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      }
    );
  }, []);

  return (
    <div className="relative flex items-center justify-center h-[150vh]">
      <h3
        ref={containerRef}
        className="leading-[75px] text-center"
      >
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
  );
};

export default HiddenTextReveal;
