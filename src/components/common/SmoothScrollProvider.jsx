// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   useLayoutEffect(() => {
//     const smoother = ScrollSmoother.create({
//       smooth: 1.2,
//       smoothTouch: 0.1,
//       effects: true,
//     });

//     return () => {
//       smoother.kill();
//       ScrollTrigger.killAll();
//     };
//   }, []);

//   return children;
// }

// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   useLayoutEffect(() => {

// //     const smoother = ScrollSmoother.create({
// //   smooth: 1.2,        // smooth scroll speed on desktop
// //   smoothTouch: 0.12,  // small smoothing on mobile
// //   effects: true,       // allow parallax / speed effects
// //   normalizeScroll: true, // keeps pinned sections stable
// //   ignoreMobileResize: true, // prevents jitter when resizing
// // });

// const smoother = ScrollSmoother.create({
//   wrapper: "#smooth-wrapper",
//   content: "#smooth-content",
//   smooth: 1.2,
//   smoothTouch: 0.12,
//   effects: true,
//   normalizeScroll: true,
//   ignoreMobileResize: true,
// });



//     return () => {
//       smoother.kill();
//       ScrollTrigger.killAll();
//     };
//   }, []);

//   return children;
// }


// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   useLayoutEffect(() => {
//     const smoother = ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1.2,
//       smoothTouch: 0.12,
//       effects: true,
//       normalizeScroll: true,
//       ignoreMobileResize: true,
//     });

//     // ⭐ IMPORTANT ⭐
//     ScrollTrigger.scrollerProxy("#smooth-content", {
//       scrollTop(value) {
//         return arguments.length
//           ? smoother.scrollTop(value)
//           : smoother.scrollTop();
//       },
//       getBoundingClientRect() {
//         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//       }
//     });

//     ScrollTrigger.addEventListener("refresh", () => smoother.refresh());
//     ScrollTrigger.refresh();

//     return () => {
//       smoother.kill();
//       ScrollTrigger.killAll();
//     };
//   }, []);

//   return children;
// }


// "use client";

// import { useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   useLayoutEffect(() => {
//     let ctx = gsap.context(() => {
//       const smoother = ScrollSmoother.create({
//         wrapper: "#smooth-wrapper",
//         content: "#smooth-content",
//         smooth: 1.2,
//         smoothTouch: 0.12,
//         normalizeScroll: false,
//         ignoreMobileResize: true,
//       });

//       // VERY IMPORTANT
//       ScrollTrigger.scrollerProxy("#smooth-content", {
//         scrollTop(value) {
//           return arguments.length
//             ? smoother.scrollTop(value)
//             : smoother.scrollTop();
//         },
//         getBoundingClientRect() {
//           return {
//             top: 0,
//             left: 0,
//             width: window.innerWidth,
//             height: window.innerHeight,
//           };
//         },
//       });

//       ScrollTrigger.addEventListener("refresh", () => smoother.refresh());
//       ScrollTrigger.refresh();
//     });

//     return () => ctx.revert();
//   }, []);

//   return children;
// }



// "use client";

// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// export default function SmoothScrollProvider({ children }) {
//   useGSAP(() => {
//     // Create smoother
//     const smoother = ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1.2,
//       smoothTouch: 0.12,
//       normalizeScroll: false, // 🔥 FIXES browser zoom issue
//       ignoreMobileResize: true,
//     });

//     // Required for ScrollTrigger
//     ScrollTrigger.scrollerProxy("#smooth-content", {
//       scrollTop(value) {
//         return arguments.length
//           ? smoother.scrollTop(value)
//           : smoother.scrollTop();
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//     });

//     ScrollTrigger.addEventListener("refresh", () => smoother.refresh());
//     ScrollTrigger.refresh();
//   });

//   return children;
// }


"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // guard for SSR / safety
      if (typeof window === "undefined") return;

      // Create smoother
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        smoothTouch: 0.12,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });

      // ScrollSmoother already works with ScrollTrigger –
      // no need for scrollerProxy here.

      ScrollTrigger.refresh();

      // cleanup on unmount / hot reload
      return () => {
        smoother?.kill();
      };
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <div id="smooth-wrapper" ref={containerRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}

