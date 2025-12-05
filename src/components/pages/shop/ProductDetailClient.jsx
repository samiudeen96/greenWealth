"use client";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/utils/constant";
import ProductCards from "@/components/ProductCards";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
    <div className="section">
      <div className="container py-10 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>{" "}
          / <span className="text-gray-800">{product.title}</span>
        </div>

        {/* Main layout */}
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-3 items-start">
          {/* LEFT: Images */}
          <div className="w-full">
            <div className="flex gap-4 items-start max-lg:flex-col-reverse">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex lg:flex-col gap-3 max-lg:mt-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-md border overflow-hidden transition-colors ${idx === activeImageIndex
                        ? "border-black"
                        : "border-muted hover:border-gray-400"
                        }`}
                    >
                      <Image
                        src={img.image}
                        alt={`${product.title} ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="relative w-full max-w-[520px] aspect-[3/4] bg-muted rounded-lg">
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         520px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="w-full col-span-2">
            <p className="text-primary text-xs uppercase tracking-[0.18em] mb-2">
              {product.category}
            </p>

            <h5 className="mb-3">
              {product.title}
            </h5>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
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
            <p className="text-sm md:text-base text-gray-600 mb-7 leading-relaxed">
              A targeted hair care essential designed to support healthier,
              fuller-looking hair. Ideal for those experiencing hair thinning,
              breakage, or dryness. Use consistently as part of your daily
              routine for best results.
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-9">
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

            {/* Details */}

            <div className="border-b border-muted py-3">
              <button
                type="button"
                className="flex w-full items-center justify-between cursor-pointer"
              >
                <p className="text-md">Key Benefits</p>
                <MdOutlineKeyboardArrowDown
                  size={20}
                />
              </button>

              <div className="p-4 space-y-3">
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Helps reduce visible hair fall</li>
                  <li>Supports healthier, fuller-looking hair</li>
                  <li>Gently nourishes scalp and strands</li>
                </ul>
              </div>
            </div>

            <div className="border-b border-muted py-3">
              <button
                type="button"
                className="flex w-full items-center justify-between cursor-pointer"
              >
                <p className="text-md">Key Benefits</p>
                <MdOutlineKeyboardArrowDown
                  size={20}
                />
              </button>

              <div className="p-4 space-y-3">
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Helps reduce visible hair fall</li>
                  <li>Supports healthier, fuller-looking hair</li>
                  <li>Gently nourishes scalp and strands</li>
                </ul>
              </div>
            </div>

            {/* <div className="space-y-5 text-sm md:text-base">
              <div>
                <h6 className="font-semibold mb-1.5">Key Benefits</h6>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Helps reduce visible hair fall</li>
                  <li>Supports healthier, fuller-looking hair</li>
                  <li>Gently nourishes scalp and strands</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold mb-1.5">How to Use</h6>
                <p className="text-gray-600 leading-relaxed">
                  Apply to clean scalp or hair as directed. Use consistently,
                  once or twice daily, and pair with a gentle shampoo and
                  conditioner for best results.
                </p>
              </div>
            </div> */}

          </div>
        </div>

        {/* Related products */}
        <div className="mt-16 md:mt-20 border-t border-muted pt-8 md:pt-10">
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
  );
};

export default ProductDetailClient;
