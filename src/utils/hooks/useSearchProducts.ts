import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../actions/getSearchedProducts";

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts({ query }),
    enabled: !!query,
  });
}
