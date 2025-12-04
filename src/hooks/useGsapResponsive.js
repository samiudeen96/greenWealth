// import { useEffect } from "react";
// import gsap from "gsap";

// export const useGsapResponsive = (callback) => {
//   useEffect(() => {
//     const ctx = gsap.matchMedia();

//     ctx.add("(max-width: 640px)", () => {
//       callback("mobile");
//     });

//     ctx.add("(min-width: 641px) and (max-width: 1023px)", () => {
//       callback("tablet");
//     });

//     ctx.add("(min-width: 1024px)", () => {
//       callback("desktop");
//     });

//     ctx.add("(min-width: 1920px)", () => callback("large-desktop"));

//     return () => ctx.revert();
//   }, [callback]);
// };


import { useEffect } from "react";
import gsap from "gsap";

export const useGsapResponsive = (callback) => {
  useEffect(() => {
    const ctx = gsap.matchMedia();

    // Mobile
    ctx.add("(max-width: 767px)", () => callback("mobile"));

    // Tablet
    ctx.add("(min-width: 768px) and (max-width: 1023px)", () => callback("tablet"));

    // Desktop
    ctx.add("(min-width: 1024px) and (max-width: 1919px)", () => callback("desktop"));

    // Large desktop
    ctx.add("(min-width: 1920px)", () => callback("large-device"));

    return () => ctx.revert(); // cleanup on unmount
  }, [callback]);
};
