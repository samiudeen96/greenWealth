"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Move image from center → down
    tl.to(imageRef.current, {
      y: 300,        // move down
      duration: 1,
      ease: "none",
    });

    // Move down → back to center
    tl.to(imageRef.current, {
      y: 0,
      duration: 1,
      ease: "none",
    });

  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] w-full flex items-center justify-center"
    >
      <div className="relative">
        <Image
          ref={imageRef}
          src="/bottle1.png"
          alt="image"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}
