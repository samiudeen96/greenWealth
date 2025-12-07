"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";



const GsapAnimationProvider = ({ children }) => {
  const gridRef = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const el = gridRef.current.querySelectorAll(".fadeOutUp");
      if (!el.length) return;

      gsap.set(el, { opacity: 0, y: 20 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.08,
      });
    },
    { scope: gridRef, dependencies: [pathname] }
  );

  return <div ref={gridRef}>{children}</div>;
};

export default GsapAnimationProvider;
