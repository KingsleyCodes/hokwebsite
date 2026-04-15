/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProduct } from "@/lib/shopify";
import { useQuery } from "@tanstack/react-query";
import { getProductRecommendation } from "../actions/getProductRecommendation";

// Using less strict typing to accommodate the API response structure
export function useFetchProduct(handle: string, initialData?: any) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: () => getProduct(handle),
    enabled: !!handle, // Only run the query if we have a handle
    initialData,
  });
}

export function useFetchRelatedProducts(
  currentProductHandle: string,
  initialData?: any,
) {
  return useQuery({
    queryKey: ["recommendation-products", currentProductHandle],
    queryFn: async () => {
      const relatedProducts =
        await getProductRecommendation(currentProductHandle);
      return relatedProducts;
    },
    enabled: !!currentProductHandle,
    initialData,
  });
}
