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
    <div className="min-h-[450px] bg-white flex flex-col items-center justify-center rounded-lg p-6 relative">
        
        <div className="min-h-[65%] w-[200px] relative">
          {imageUrl && (
          <Image
          className="object-cover"
            src={imageUrl}
            fill
            // width={200}
            // height={250}
            alt={item.title}
          />
        )}
        </div>

      <div className="min-h-[35%] flex flex-col items-center justify-center">
        <p className="text-primary mt-4">{category}</p>

      <p className="mt-2 font-semibold text-center">{item.title}</p>

      {/* Uncomment when you add real prices */}
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
