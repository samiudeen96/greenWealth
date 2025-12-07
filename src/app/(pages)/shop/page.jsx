"use client";

import React, { useRef, useState, useMemo } from "react";
import { currency, products } from "@/utils/constant";
import ProductCards from "@/components/ProductCards";
import Filters from "@/components/Filters";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

const parsePrice = (priceString) => {
  if (!priceString) return 0;
  const num = parseFloat(priceString.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num;
};

const Shop = () => {
  const [filters, setFilters] = useState({
    collections: {
      newArrivals: false,
      bestSellers: false,
      onSale: false,
      pack: false,
    },
    types: {
      lotion: false,
      oil: false,
      shampoo: false,
      tool: false,
      pack: false,
    },
    prices: {
      under150: false,
      between200And300: false,
      above300: false,
    },
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = parsePrice(product.price);

      // Collections
      const col = filters.collections;
      const collectionFilterActive = Object.values(col).some(Boolean);
      const matchesCollections =
        !collectionFilterActive ||
        (col.newArrivals && product.newArrivals) ||
        (col.bestSellers && product.bestSellers) ||
        (col.onSale && product.onSale) ||
        (col.pack && product.pack);

      if (!matchesCollections) return false;

      // Types
      const t = filters.types;
      const typeFilterActive = Object.values(t).some(Boolean);
      const matchesType =
        !typeFilterActive ||
        (t.lotion && product.category === "lotion") ||
        (t.oil && product.category === "oil") ||
        (t.shampoo && product.category === "shampoo") ||
        (t.tool && product.category === "tool");
      // (t.pack && product.category === "pack");

      if (!matchesType) return false;

      // Prices
      const p = filters.prices;
      const priceFilterActive = Object.values(p).some(Boolean);
      const matchesPrice =
        !priceFilterActive ||
        (p.under150 && price < 150) ||
        (p.between200And300 && price >= 200 && price <= 300) ||
        (p.above300 && price > 300);

      if (!matchesPrice) return false;

      return true;
    });
  }, [filters]);

  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".product-card");
      if (!cards.length) return;

      gsap.killTweensOf(cards);

      // reset before animating (important when filters change)
      gsap.set(cards, { opacity: 0, y: 20 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.08,
      });
    },
    {
      scope: gridRef,
      dependencies: [filters], // rerun on every filter change
    }
  );

  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="py-10 border-b border-muted">
            <div className="flex justify-center items-center flex-col">
              <h5 className="text-2xl font-bold mb-4">Shop</h5>
              <p>Home / Shop</p>
            </div>
          </div>

          <div className="py-10 grid md:grid-cols-4 gap-8">
            {/* Filters sidebar column */}
            <div className="col-span-4 md:col-span-1">
              <div className="">
                <Filters filters={filters} onChange={setFilters} />
              </div>
            </div>

            {/* Products grid */}
            <div
              ref={gridRef}
              className="col-span-4 md:col-span-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-10"
            >
              {filteredProducts.map((item) => (
                <Link href={`/shop/${item.slug}`} key={item.slug}>
                  <ProductCards item={item} />
                </Link>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Shop;
