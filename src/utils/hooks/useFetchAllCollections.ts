import { getCollections } from "@/lib/shopify";
import { Collection } from "@/lib/shopify/types";
import { useQuery } from "@tanstack/react-query";

export function useFetchAllCollections() {
  return useQuery<Collection[], Error>({
    queryKey: ["collections"],
    queryFn: async () => {
      try {
        const collections = await getCollections();
        return collections;
      } catch (error) {
        console.error("Error fetching collections:", error);
        throw new Error("Failed to load collections");
      }
    },
    staleTime: 1000 * 60 * 60 * 72,
    gcTime: 1000 * 60 * 60 * 72,
    retry: 2
  });
}
