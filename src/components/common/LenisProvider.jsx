// "use client";

// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// export default function LenisProvider({ children }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 5,
//       smooth: true,
//       direction: "vertical",
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//   }, []);

//   return <>{children}</>;
// }

// "use client";

// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useDeviceType } from "@/hooks/useDeviceType";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   const device = useDeviceType();

//   useEffect(() => {
//     const smoother = ScrollSmoother.create({
//       smooth: device === "mobile" ? 8 : 3, // like Lenis duration/smoothing
//       effects: true, // enables data-speed & data-lag
//       normalizeScroll: true,
//     });

//     return () => {
//       smoother.kill(); // cleanup on unmount
//     };
//   }, []);

//   return (
//     <div id="smooth-wrapper">
//       <div id="smooth-content">{children}</div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceType } from "@/hooks/useDeviceType";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const device = useDeviceType();

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: device === "mobile" ? 8 : 3,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0.1, // optional, for mobile touch feel
    });

    return () => {
      smoother.kill();
    };
  }, [device]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
