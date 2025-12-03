// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";

// export default function ParallaxScroll() {
//   const { scrollYProgress } = useScroll();

//   const y = useTransform(scrollYProgress, [0, 1], [-480, 0], {
//     clamp: false,
//   });

//   return (
//     <motion.div
//       style={{
//         y,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         willChange: "transform",
//       }}
//     >

//       <div style={{ width: 250, height: 250 }}>
//         <Image
//           className="object-contain"
//           src="/products/product1.jpg"
//           width={250}
//           height={250}
//           alt="product1"
//           priority
//         />
//       </div>
//     </motion.div>
//   );
// }

// "use client";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import React from "react";

// const ParallaxScroll = () => {
//   const tl = gsap.timeline();

//   useGSAP(() => {
//     tl.to(".text1", {
//       // y: 20,
//       opacity: 1,
//       delay: 2,
//       ease: "power1.inOut",
//     });

//     tl.to(".text1", {
//       y: 20,
//       // opacity: 1,
//       delay: 2,
//       duration: 1.3,
//       ease: "power1.inOut",
//     });
//   });

//   return (
//     <section className="h-[calc(100vh-56px)] bg-red-200">
//       <h1 className="text1 translate-y-[38dvh] opacity-0">
//         Your healthiest <br /> skin revealed.
//       </h1>
//     </section>
//   );
// };

// export default ParallaxScroll;


"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxScroll() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const pinTarget = document.querySelector(".pin-box");

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom+=400 top",
      pin: pinTarget,
      pinSpacing: true, // keeps space while pinned
      markers: false,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[200vh] bg-gray-100 relative p-10"
    >
      <div className="pin-box w-40 h-40 bg-blue-500 text-white flex items-center justify-center">
        I am pinned
      </div>

      <div className="mt-[500px]">
        <p>Scroll down to see pin effect</p>
      </div>
    </section>
  );
}


// "use client";
// import { useScreenSize } from "@/hooks/useScreenSize";
// import { scrollContent } from "@/utils/constant";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import Image from "next/image";
// import React, { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const containerRef = useRef(null);
//   const productWrapperRef = useRef(null);
//   const scrollRefs = useRef([]);
//   const { width } = useScreenSize();

//   // Add sections to scrollRefs
//   const addToRefs = (el) => {
//     if (el && !scrollRefs.current.includes(el)) {
//       scrollRefs.current.push(el);
//     }
//   };

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       // ---------------- MOBILE ----------------
//       mm.add("(max-width: 640px)", () => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".hiddenText",
//             start: "top top",
//             end: "bottom+=500 top+=40%",
//             scrub: true,
//             pin: true,
//           },
//         });

//         // Initial Y move
//         tl.to(productWrapperRef.current, {
//           y: 240,
//           duration: 1,
//           ease: "power1.out",
//         });

//         // Final move
//         tl.to(productWrapperRef.current, {
//           x: 0,
//           y: 250,
//           duration: 2,
//           ease: "power1.in",
//         });
//       });

//       // ---------------- TABLET + DESKTOP ----------------
//       mm.add("(min-width: 641px)", () => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".hiddenText",
//             start: "top top",
//             end: "bottom+=500 top+=40%",
//             scrub: true,
//             pin: true,
//           },
//         });

//         // Initial Y move
//         tl.to(productWrapperRef.current, {
//           y: 300,
//           duration: 1,
//           ease: "power1.out",
//         });

//         // Final move
//         tl.to(productWrapperRef.current, {
//           x: 280,
//           y: -50,
//           duration: 2,
//           ease: "power1.in",
//         });
//       });

//       // ---------------- TEXT APPEAR ----------------
//       gsap.timeline().to(".text1", { opacity: 1, delay: 1, ease: "power1.inOut" })
//         .to(".text1", { y: 20, duration: 1.3, ease: "power1.inOut" });

//       // ---------------- HIDDEN TEXT FADE ----------------
//       gsap.to(".hiddenText", {
//         opacity: 1,
//         scrollTrigger: {
//           trigger: ".hiddenText",
//           start: "top center",
//           end: "bottom center",
//           scrub: true,
//           pin: true,
//         },
//       });

//       // ---------------- PIN OTHER SECTIONS ----------------
//       scrollRefs.current.forEach((section) => {
//         ScrollTrigger.create({
//           trigger: section,
//           start: "top top",
//           end: "bottom top",
//           pin: true,
//           pinSpacing: true,
//         });
//       });

//       return () => mm.revert();
//     }, containerRef);

//     return () => ctx.revert();
//   });

//   return (
//     <section className="relative">
//       {/* ---------------- SECTION 1 ---------------- */}
//       <div className="relative h-[calc(100vh-56px)] w-full">
//         <h1 className="text1 opacity-0 translate-y-[38vh]">
//           Your healthiest <br /> skin revealed.
//         </h1>
//       </div>

//       {/* ---------------- SECTION 2 ---------------- */}
//       <div
//         ref={containerRef}
//         className="flex items-start justify-center sm:h-[100vh] h-[70vh]"
//       >
//         <h1 className="hiddenText opacity-0">HiddenText</h1>
//       </div>

//       {/* ---------------- PRODUCT IMAGE ---------------- */}
//       <div
//         ref={productWrapperRef}
//         className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//       >
//         <Image
//           src="/products/product2.avif"
//           width={340}
//           height={340}
//           alt="Product"
//         />
//       </div>

//       {/* ---------------- SCROLL SECTIONS ---------------- */}
//       {scrollContent.map((item, index) => (
//         <div
//           key={index}
//           className="h-screen flex sm:items-center"
//           ref={addToRefs}
//         >
//           <div className="sm:w-11/12 mx-auto">
//             <div className="sm:w-5/12">
//               <h4>{item.title}</h4>
//               <p>{item.content}</p>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* ---------------- SHOW DEVICE WIDTH ---------------- */}
//       <div className="fixed bottom-10 right-10 text-red-800">
//         {width}px
//       </div>
//     </section>
//   );
// };

// export default Hero;

