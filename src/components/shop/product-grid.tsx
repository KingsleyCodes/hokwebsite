import { Products } from "@/lib/shopify/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductGridProps {
  products: Products;
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // Format price for display
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: products.currencyCode || "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <div className="group font-inter transition-all duration-300 ease-in-out">
      <Link href={`/shop/${products.handle}`} className="block">
        <div className="relative overflow-hidden rounded-md bg-gray-100">
          <Image
            src={products.featuredImage?.url || "/placeholder.svg"}
            alt={products.featuredImage?.altText || products.title}
            width={500}
            height={500}
            className="aspect-square w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <button
            className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist functionality
            }}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3">
          <h3 className="font-medium">{products.title}</h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="font-semibold">{formatPrice(products.price)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductGrid;
