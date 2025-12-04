"use client";
import React from "react";
import { useProducts } from "@/queryHooks/useProducts";
import Image from "next/image";
import { currency } from "@/utils/constant";

const Shop = () => {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  //  const display_name = data.display_name

  return (
    <div className="h-[100vh] pt-[64px]">

    <div className="container border-b border-muted mb-10">
         <div className="section py-20 flex justify-center items-center flex-col">
      <h5 className="text-2xl font-bold mb-4">Shop</h5>
      <p>Home / Shop</p>
    </div>
    </div>

  <div className="container">

    <div className="section">
            {data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 min-h-96">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded shadow hover:shadow-lg transition bg-white rounded-lg"
            >

              <div className="">
                <Image src="/products/essence.webp" width={700} height={700} alt="" />
              </div>
              {/* <p className="font-semibold">{item.name}</p>
              <p>${item.price}</p> */}
              {/* <div className="grid grid-cols-2 items-center justify-between">
                
              </div> */}

              <div className="mt-5">
                <p className="truncate max-w-[300px]">{item.display_name}</p>

                <p className="mt-2">{item.list_price} {currency}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
      </div>  

      </div>
    </div>
  );
};

export default Shop;
