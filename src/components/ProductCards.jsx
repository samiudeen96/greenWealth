import Image from "next/image";
import React from "react";

// Change this to your public Medusa URL (no /store at the end)
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_URL || "http://3.108.63.117:9000";

function getProductImage(item) {
  // Use thumbnail if set, otherwise first image
  let url =
    item.thumbnail ||
    (item.images && item.images[6] && item.images[6].url) ||
    null;

  if (!url) return null;

  // Fix local URLs coming from Medusa (http://localhost:9000/...)
  url = url.replace("http://localhost:9000", MEDUSA_BACKEND_URL);

  return url;
}

const ProductCards = ({ item }) => {
  const imageUrl = getProductImage(item);

  // Later you can use item.collection?.title or tags as category
  const category = "Hair Care";

  // If you add prices in Medusa, you can read them like:
  // const variant = item.variants && item.variants[0];
  // const price = variant && variant.prices && variant.prices[0];
  // const formattedPrice = price
  //   ? `${(price.amount / 100).toFixed(2)} ${price.currency_code.toUpperCase()}`
  //   : null;

  return (
<div className="min-h-[450px] bg-white flex flex-col items-center justify-center rounded-lg relative">
  {/* IMAGE AREA */}
  <div className="p-6 min-h-[65%] w-full">
    <div className="h-full w-full relative">
      {imageUrl && (
          <Image
            className="object-contain"
            src={imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  (max-width: 1280px) 33vw,
                  25vw"
          />

      )}
    </div>
  </div>

  {/* TEXT AREA */}
  <div className=" flex flex-col items-center justify-center w-full p-6">
    <p className="text-primary mt-4">{category}</p>
    <p className="mt-2 font-semibold text-center">{item.title}</p>

    <p className="mt-5">{item.description}</p>

    {/* <div className="flex items-center justify-center gap-10 ">
        <p className="text-red-800 mt-2">price</p>
      </div> */}

    {/* Price (later) */}
    {/* {formattedPrice && (
      <div className="flex items-center justify-center gap-10 mt-5">
        <p className="text-red-800">{formattedPrice}</p>
      </div>
    )} */}
  </div>
</div>

  );
};

export default ProductCards;
