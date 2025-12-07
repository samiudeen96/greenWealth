"use client";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/utils/constant";
import ProductCards from "@/components/ProductCards";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Slider from "@/components/Slider";

const ProductDetailClient = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images || [];
  const mainImage =
    images[activeImageIndex]?.image || images[0]?.image || "/fallback.png";

  const price = product.price;
  const offerPrice = product.offerPrice;

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <div className="hfull flex items-center py-10 ">
        <div className="section">
          <div className="container ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center">
              {/* RIGHT: Info */}
              <div className="">
                <p className="text-xs uppercase tracking-[0.18em] mb-2 fadeOutUp">
                  {product.category}
                </p>

                <h5 className="mb-3 fadeOutUp text-primary">{product.title}</h5>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5 fadeOutUp">
                  {offerPrice ? (
                    <>
                      <p className="text-xl md:text-2xl font-semibold text-red-700">
                        {offerPrice}
                      </p>
                      <p className="text-sm line-through text-gray-400">
                        {price}
                      </p>
                    </>
                  ) : (
                    <p className="text-xl md:text-2xl font-semibold text-gray-900">
                      {price}
                    </p>
                  )}
                </div>

                {/* Short description */}
                <p className="text-sm md:text-base text-gray-600 mb-7 leading-relaxed fadeOutUp">
                  A targeted hair care essential designed to support healthier,
                  fuller-looking hair. Ideal for those experiencing hair
                  thinning, breakage, or dryness. Use consistently as part of
                  your daily routine for best results.
                </p>

                {/* Quantity + Add to Cart */}
                <div className="flex flex-wrap items-center gap-4 mb-9 fadeOutUp">
                  <div className="flex items-center border border-muted rounded-full overflow-hidden">
                    <button
                      type="button"
                      onClick={decrement}
                      className="px-4 py-2 text-sm"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 text-sm border-x border-muted min-w-[44px] text-center">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={increment}
                      className="px-4 py-2 text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="px-7 py-2.5 rounded-full bg-black text-white text-sm md:text-base hover:bg-black/90 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="">
                <Slider images={images} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">

          {/* Related products */}
          {/* <div className="mt-16 md:mt-20 border-t border-muted pt-8 md:pt-10"> */}
          <div className="py-16">
            <h6 className="text-lg md:text-xl font-semibold mb-5 md:mb-6">
              You might also like
            </h6>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products
                .filter((p) => p.slug !== product.slug)
                .slice(0, 4)
                .map((p) => (
                  <Link key={p.slug} href={`/shop/${p.slug}`}>
                    <ProductCards item={p} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailClient;
