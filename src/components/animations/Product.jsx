"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Product = () => {
  // const tl = gsap.timeline();

  const productRef = useRef();

    // useGSAP(()=>{
    //        gsap.fromTo(productRef.current, 
    //     {
    //       y: 350,
    //       scrollTrigger:{
    //         trigger: productRef.current,
    //       start: "top center",
    //       end: "top top",
    //       scrub: true,

    //       },
    //       ease: "power1.inOut",
    //   },
    //     {
    //       y: -100,
    //       x: 250,
    //       delay: 3,
    //       scrollTrigger:{
    //         trigger: productRef.current,
    //       start: "top center",
    //       end: "top top",
    //       scrub: true,

    //       },
    //       ease: "power1.inOut",
    //   }
    // )
    // })

  

  return (
<div className="h-screen w-full relative">
  <Image
    ref={productRef}
    src="/products/product2.avif"
    width={300}
    height={300}
    alt="Product"
    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  />
</div>

  );
};

export default Product;
