"use client";
import React from "react";
import { useProducts } from "@/queryHooks/useProducts";
import Image from "next/image";
import { currency, products } from "@/utils/constant";
import ProductCards from "@/components/ProductCards";

const Shop = () => {
  const { data, isLoading, isError, error } = useProducts();

  console.log("Products:", data);
  

  return (
    <div className="bg-background">
        <div className="section">

            <div className="container">
                <div className="py-16 border-b border-muted">
                    <div className=" flex justify-center items-center flex-col ">
                    <h5 className="text-2xl font-bold mb-4">Shop</h5>
                    <p>Home / Shop</p>
                  </div>
                </div>

                <div className="py-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {data?.map((item)=>(
                      <ProductCards item={item} key={item.id} />
                    ))}
                </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Shop;
