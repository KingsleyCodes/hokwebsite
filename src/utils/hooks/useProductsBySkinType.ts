import { useQuery } from "@tanstack/react-query";
import { getProductsBySkinType } from "../actions/getProductsBySkinType";

export function useProductsBySkinType(handle: string) {
  return useQuery({
    queryKey: ["products-by-skin", handle],
    queryFn: () => getProductsBySkinType(handle),
    enabled: !!handle,
  });
}
