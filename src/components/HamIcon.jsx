"use client"
import { useState } from "react";

export default function HamIcon() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`w-[60px] h-[45px] relative cursor-pointer transition-transform duration-500 ease-in-out ${
        open ? "open" : ""
      }`}
      id="nav-icon4"
    >
      <span className="absolute left-0 top-0 block h-[3px] w-full bg-orange-600 rounded-[2px] transition-all duration-300 ease-in-out origin-left"></span>
      <span className="absolute left-0 top-[9px] block h-[3px] w-full bg-orange-600 rounded-[2px] transition-all duration-300 ease-in-out origin-left"></span>
      <span className="absolute left-0 top-[18px] block h-[3px] w-full bg-orange-600 rounded-[2px] transition-all duration-300 ease-in-out origin-left"></span>
    </div>
  );
}
