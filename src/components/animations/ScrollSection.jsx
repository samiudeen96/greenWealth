"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!container || !left || !right) return;

    // kill previous triggers (in case of HMR)
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const mm = gsap.matchMedia();

    mm.add(
      {
        // desktop / tablet
        isDesktop: "(min-width: 768px)",
        // mobile
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        // Left: pin each section one-by-one
        const sections = gsap.utils.toArray(".pin-section");

        sections.forEach((sec, i) => {
          // On desktop we pin each section to create the 'one-by-one' effect
          ScrollTrigger.create({
            trigger: sec,
            start: "top top", // when section top hits viewport top
            end: "bottom top", // until section bottom hits viewport top
            pin: isDesktop,
            pinSpacing: false,
            invalidateOnRefresh: true,
            markers: true,
          });
        });

        // Right: pin the right column for the entire height of the left container
        if (isDesktop) {
          // compute scroll length of left content (total height - viewport height)
          const totalScroll = left.scrollHeight - window.innerHeight;

          ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: () => `+=${Math.max(0, totalScroll)}`,
            pin: right,
            pinSpacing: false,
            scrub: false,
            invalidateOnRefresh: true,
            markers: false,
          });
        } else {
          // On mobile we don't pin the right column; it will stack underneath
          // but we still want normal flow so no pin is created.
        }

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      }
    );

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Side-by-side — pin left sections, keep right fixed</h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT: scrolling/pinning sections */}
          <div
            ref={leftRef}
            className="md:col-span-7 col-span-1 space-y-0"
          >
            {/* Each section is full viewport height so pinning looks clean */}
            {[1, 2, 3, 4, 5].map((n) => (
              <section
                className="pin-section h-screen flex items-center justify-center border-b border-gray-200 bg-white"
                key={n}
              >
                <div className="w-full max-w-2xl px-6 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Section {n}</h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    This is left content section {n}. It pins one-by-one on desktop/tablet. On mobile the layout stacks.
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* RIGHT: fixed content until the 5th section finishes */}
          <aside
            ref={rightRef}
            className="md:col-span-5 col-span-1 md:sticky md:top-0 md:h-screen md:flex md:items-center md:justify-center"
            aria-hidden="false"
          >
            <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-gray-50">
              <div className="sticky top-8">
                <h3 className="text-xl font-semibold mb-3">Right column</h3>
                <p className="text-gray-700 mb-4">This panel stays fixed while the left side pins through sections 1–5 (desktop/tablet). On mobile the right column flows after the left content.</p>
                <div className="space-y-3">
                  <button className="w-full py-2 rounded-lg border">Action</button>
                  <button className="w-full py-2 rounded-lg bg-black text-white">Primary</button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 text-xs text-gray-500">Tip: resize the window to see responsive behavior. Install <code>gsap</code> and import this component into a page.</div>
      </div>
    </main>
  );
}