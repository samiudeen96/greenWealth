"use client"
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const HiddenText = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(containerRef.current.querySelector('.hiddenText'), {
      opacity: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        pin: true,
        // pinSpacing: true,
        // markers: true, // optional, for debugging
      },
      ease: "power3.inOut",
    });
  });

  return (
    <div
      ref={containerRef}
      className='flex items-start justify-center h-[88vh]'
    >
      <h1 className='hiddenText opacity-0'>HiddenText</h1>
    </div>
  );
}

export default HiddenText;

