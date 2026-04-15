"use server";

import searchProductsQuery from "@/graphql/queries/searchProducts.graphql";
import { shopifyFetch } from "@/lib/shopify";
import {
  GetSearchedProductsQuery,
  GetSearchedProductsQueryVariables,
} from "@/types/storefront.generated";
import { print } from "graphql";

export async function searchProducts(
  variables: GetSearchedProductsQueryVariables,
) {
  const response = await shopifyFetch<{ data: GetSearchedProductsQuery }>({
    query: print(searchProductsQuery),
    variables,
  });
  return response.body?.data?.search?.edges.map((edge) => edge.node) || [];
}
