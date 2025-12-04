import React from "react";

const Footer = () => {
  return <div className="section">

    <div className="container bg-blue-200">
      <div className="grid grid-cols-5 gap-10">
        <div className="bg-red-200 col-span-2">
          <p className="text-lg font-semibold">About Us</p>
          <p>Paradise International General Trading LLC is the proud owner and exclusive distributor of the Green Wealth® brand and its flagship product, Neo Hair Lotion®, both protected trademarks recognized for premium herbal hair care and wellness solutions.</p>
        </div>
        <div className="bg-yellow-100">
          <p className="text-lg font-semibold">Information</p>
        </div>
        <div className="bg-green-200">
          <p className="text-lg font-semibold">Customer Support</p>
        </div>
        <div className="bg-green-200">
          <p className="text-lg font-semibold">Store Information</p>
        </div>

      </div>
    </div>

  </div>;
};

export default Footer;
