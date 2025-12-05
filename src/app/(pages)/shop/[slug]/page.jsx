"use client";
import ProductDetailClient from "@/components/pages/shop/ProductDetailClient";
import { products } from "@/utils/constant";
import { useParams } from "next/navigation";

const findProductBySlug = (slug) => {
  if (!slug) return null;
  return products.find((p) => p.slug === slug) || null;
};

export default function ProductDetailPage() {
  const params = useParams();           // 👈 get params from router
  const slug = params?.slug;            // ✅ just use params directly
  const product = findProductBySlug(slug);

  if (!product) {
    return (
      <div className="section">
        <div className="container py-16">
          <p className="text-center text-sm text-gray-500">
            Product not found.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
