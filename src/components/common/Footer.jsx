import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="section shadow">
      <div className="container mx-auto pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Logo + Description */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative h-[60px] w-full max-w-[220px]">
              <Image
                src="/paradise1.png"
                alt="Paradise International General Trading LLC"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 180px, 220px"
              />
            </div>

            <p className="mt-5 text-sm md:text-[15px] leading-relaxed">
              Paradise International General Trading LLC is the proud owner and
              exclusive distributor of the Green Wealth® brand and its flagship
              product, Neo Hair Lotion®, both protected trademarks recognized
              for premium herbal hair care and wellness solutions.
            </p>
          </div>

          {/* Spacer on desktop (optional) */}
          <div className="hidden md:block md:col-span-1 lg:col-span-2" />

          {/* Information */}
          <div className="md:col-span-2">
            <p className="text-base text-black/40 mb-4">Information</p>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
              <li>Shipping &amp; Delivery</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="md:col-span-2">
            <p className="text-base text-black/40 mb-4">Customer Support</p>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Return &amp; Refund Policy</li>
              {/* <li>Track Your Order</li> */}
            </ul>
          </div>

          {/* Store Information */}
          <div className="md:col-span-2">
            <p className="text-base text-black/40 mb-4">Store Information</p>
            <ul className="space-y-2 text-sm">
              <li>2003, One By Omniyat</li>
              <li>Dubai, United Arab Emirates</li>
              <li>sales@greenwealth.com</li>
              <li>+971 504556326</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
