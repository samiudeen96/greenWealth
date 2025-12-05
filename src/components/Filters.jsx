import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Filters = ({ filters, onChange }) => {
  const { collections, types, prices } = filters;
  // Accordion / tab states
  const [openSections, setOpenSections] = useState({
    collections: false,
    type: false,
    price: false,
  });

  const toggleSection = (key) => () => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCollectionChange = (key) => (e) => {
    onChange({
      ...filters,
      collections: {
        ...collections,
        [key]: e.target.checked,
      },
    });
  };

  const handleTypeChange = (key) => (e) => {
    onChange({
      ...filters,
      types: {
        ...types,
        [key]: e.target.checked,
      },
    });
  };

  const handlePriceChange = (key) => (e) => {
    onChange({
      ...filters,
      prices: {
        ...prices,
        [key]: e.target.checked,
      },
    });
  };

  // count how many filters are active
  const activeCount =
    Object.values(collections).filter(Boolean).length +
    Object.values(types).filter(Boolean).length +
    Object.values(prices).filter(Boolean).length;

  return (
    <div className="md:block hidden">
      {/* Header */}
      <div className="border-b border-muted py-4">
        <p className="text-md font-medium">Filters ({activeCount})</p>
      </div>

      {/* Collections */}
      <div className="border-b border-muted py-3">
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={toggleSection("collections")}
          aria-expanded={openSections.collections}
        >
          <p className="text-md">Collections</p>
          <MdOutlineKeyboardArrowDown
            size={20}
            className={`transition-transform ${
              openSections.collections ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.collections && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                id="filter-collection-new-arrivals"
                type="checkbox"
                checked={collections.newArrivals}
                onChange={handleCollectionChange("newArrivals")}
              />
              <label className="text-black/65" htmlFor="filter-collection-new-arrivals">
                New Arrivals
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-collection-best-sellers"
                type="checkbox"
                checked={collections.bestSellers}
                onChange={handleCollectionChange("bestSellers")}
              />
              <label className="text-black/65" htmlFor="filter-collection-best-sellers">
                Best Sellers
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-collection-on-sale"
                type="checkbox"
                checked={collections.onSale}
                onChange={handleCollectionChange("onSale")}
              />
              <label className="text-black/65" htmlFor="filter-collection-on-sale">On Sale</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-collection-pack"
                type="checkbox"
                checked={collections.pack}
                onChange={handleCollectionChange("pack")}
              />
              <label className="text-black/65" htmlFor="filter-collection-pack">Pack</label>
            </div>
          </div>
        )}
      </div>

      {/* Type */}
      <div className="border-b border-muted py-3">
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={toggleSection("type")}
          aria-expanded={openSections.type}
        >
          <p className="text-md">Type</p>
          <MdOutlineKeyboardArrowDown
            size={20}
            className={`transition-transform ${
              openSections.type ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.type && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                id="filter-type-lotion"
                type="checkbox"
                checked={types.lotion}
                onChange={handleTypeChange("lotion")}
              />
              <label className="text-black/65" htmlFor="filter-type-lotion">Lotion</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-type-oil"
                type="checkbox"
                checked={types.oil}
                onChange={handleTypeChange("oil")}
              />
              <label className="text-black/65" htmlFor="filter-type-oil">Oil</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-type-shampoo"
                type="checkbox"
                checked={types.shampoo}
                onChange={handleTypeChange("shampoo")}
              />
              <label className="text-black/65" htmlFor="filter-type-shampoo">Shampoo</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-type-tool"
                type="checkbox"
                checked={types.tool}
                onChange={handleTypeChange("tool")}
              />
              <label className="text-black/65" htmlFor="filter-type-tool">Tool</label>
            </div>

            {/* <div className="flex items-center gap-2">
              <input
                id="filter-type-pack"
                type="checkbox"
                checked={types.pack}
                onChange={handleTypeChange("pack")}
              />
              <label className="text-black/65" htmlFor="filter-type-pack">Pack</label>
            </div> */}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-muted py-3">
        <button
          type="button"
          className="flex w-full items-center justify-between cursor-pointer"
          onClick={toggleSection("price")}
          aria-expanded={openSections.price}
        >
          <p className="text-md">Price</p>
          <MdOutlineKeyboardArrowDown
            size={20}
            className={`transition-transform ${
              openSections.price ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.price && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                id="filter-price-under-150"
                type="checkbox"
                checked={prices.under150}
                onChange={handlePriceChange("under150")}
              />
              <label className="text-black/65" htmlFor="filter-price-under-150">Under 150 AED</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-price-200-300"
                type="checkbox"
                checked={prices.between200And300}
                onChange={handlePriceChange("between200And300")}
              />
              <label className="text-black/65" htmlFor="filter-price-200-300">200 AED - 300 AED</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="filter-price-above-300"
                type="checkbox"
                checked={prices.above300}
                onChange={handlePriceChange("above300")}
              />
              <label className="text-black/65" htmlFor="filter-price-above-300">Above 300 AED</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
