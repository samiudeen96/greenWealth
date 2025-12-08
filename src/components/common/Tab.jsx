"use client";
import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex gap-10 border-b border-gray-200">
        {tabs?.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              pb-3 text-sm md:text-base font-medium transition-all cursor-pointer
              ${active === i ? "text-primary border-b-2 border-primary" : " border-b-2 border-white text-gray-500 hover:text-primary"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs[active].content}
      </div>
    </div>
  );
};

export default Tabs;
