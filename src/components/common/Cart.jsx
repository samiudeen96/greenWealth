"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const price = 85;
  const cartRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, display: "flex" });
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.55, ease: "power2.inOut" }
      );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(panelRef.current, {
        x: "100%",
        duration: 0.45,
        ease: "power2.inOut",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        display: "none",
        delay: 0.45,
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Cart Button */}
      <div
        className="flex items-center gap-1 cursor-pointer" ref={cartRef}
        onClick={() => setIsOpen(true)}
      >
        <p>Bag</p>
        <div className="min-w-5 h-5 bg-[#3a3d38] rounded-sm flex items-center justify-center text-xs font-semibold text-white">
          1
        </div>
      </div>

      {/* Backdrop + Cart */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-10 bg-[rgba(51,51,51,0.5)] backdrop-blur-[10px] flex justify-end opacity-0 hidden h-screen p-6"
        onClick={() => setIsOpen(false)}
      >
        {/* Cart Panel */}
        <div
          ref={panelRef}
          className="xl:w-3/12 w-full max-w-full h-full bg-white sm:rounded-xl shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sm:px-6 px-5 border-b border-[#dedede] flex justify-between items-center h-[10%]">
            <div className="flex items-center gap-1">
              <h6>Bag</h6>
              <div className="min-w-5 h-5 bg-[#3a3d38] rounded-sm flex items-center justify-center text-xs font-semibold text-white">
                1
              </div>
            </div>
            <Image
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
              src="/close.svg"
              width={25}
              height={25}
              alt="close"
              priority
            />
          </div>

          {/* Cart Content */}
          <div className="sm:p-6 p-5 h-[65%] overflow-y-auto">
            <div className="flex items-center gap-6">
              <div className="w-[180px] h-[180px] relative border-2 border-[#dedede] rounded-2xl overflow-hidden">
                <Image
                  className="object-cover"
                  src="/products/product1.jpg"
                  fill
                  alt="product1"
                  priority
                />
              </div>

              <div className="w-7/12">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Floradyle</p>
                    <p className="text-xs mt-1">Standard(50ml)</p>
                  </div>
                  <div className="text-sm">${price}</div>
                </div>

                {/* Quantity & Total */}
                <div className="flex justify-between mt-5 items-center">
                  <div className="border rounded-md flex w-[90px] overflow-hidden text-sm font-semibold">
                    <button
                      onClick={decrease}
                      className="flex-1 py-1 text-center hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <div className="flex-1 py-1 text-center bg-gray-50 select-none">
                      {count}
                    </div>
                    <button
                      onClick={increase}
                      className="flex-1 py-1 text-center hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm font-medium">${price * count}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sm:p-6 p-5 h-[25%] border-t border-[#dedede]">
            <div className="grid grid-cols-2 justify-between w-full">
              <div>Shipping & Taxes</div>
              <div className="text-end text-xs">Calculated at checkout</div>
              <div className="mt-2 font-semibold text-2xl">Subtotal</div>
              <div className="text-end mt-2 font-semibold text-2xl">
                ${price * count}
              </div>
            </div>

            <button className="button2 mt-4 w-full">Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
