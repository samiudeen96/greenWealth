"use client"
import { menu } from "@/utils/constant";
import Image from "next/image";
import React from "react";
import Cart from "./Cart";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
const pathname = usePathname();

const linkClasses = (path) =>
    pathname === path
      ? "text-secondary" // active
      : ""; // normal

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <section
        className="h-[60px] lg:px-12 sm:px-6 px-4 flex 
        items-center justify-between
        bg-white/60 backdrop-blur-md border-b border-white/20"
      >
        {/* Mobile Menu */}
        <div className="block sm:hidden">
          {/* <HamIcon /> */}
          <Image
            src="/menu.svg"
            width={32}
            height={32}
            alt="menu icon"
            priority
          />
        </div>

        {/* Logo */}
        <div className="relative">
                  <Link href={"/"}>
          <Image
          className="cursor-pointer"
            src="/brand.webp"
            alt="Hero image"
            width={90}
            height={40}
            priority
          />
        </Link>
        </div>

        {/* Menu */}
        <ul className="sm:flex gap-8 items-center justify-center hidden">
          {menu.map((item, index) => (
            <li key={index}>
              
              <Link className="animated-button" href={item.path}>
              <div className={`button-inner ${linkClasses(item.path)}`}>
                  <p className={`button-text`}>{item.label}</p>
                  <p className="button-text-hover">{item.label}</p>
                </div>
              </Link>

            </li>
          ))}
        </ul>

        {/* Right Side (Order + Bag) */}
        <div className="flex justify-end">
          {/* <div className="sm:flex gap-5 items-center hidden"> */}
            {/* <button className="button2">Order Now</button> */}
            <Cart />
          {/* </div>
          <div className="sm:hidden">
            <Cart />
          </div> */}
        </div>
        {/* <Cart /> */}
      </section>
    </header>
  );
};

export default Header;
