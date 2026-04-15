"use server";

import { shopifyFetch } from "@/lib/shopify";

// Define proper types for the Shopify response structure
interface ShopifyImageNode {
  url: string;
  altText?: string | null;
}

interface ShopifyImageEdge {
  node: ShopifyImageNode;
}

interface ShopifyImagesConnection {
  edges: ShopifyImageEdge[];
}

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
}

// Define the product recommendation structure as it comes from Shopify
interface ShopifyProductRecommendation {
  id: string;
  title: string;
  handle: string;
  priceRange: ShopifyPriceRange;
  images: ShopifyImagesConnection;
}

// Define the processed recommendation structure that will be returned
interface ProcessedRecommendation {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  featuredImage: {
    url: string;
    altText: string;
  };
}

// Define the structure of the Shopify API response
interface ShopifyApiResponse {
  data?: {
    productRecommendations?: ShopifyProductRecommendation[];
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extensions?: Record<string, any>;
  }>;
}

/**
 * Fetches product recommendations from Shopify based on a product ID
 * @param productId - The Shopify product ID to get recommendations for
 * @returns An array of processed product recommendations
 */
export async function getProductRecommendation(
  productId: string,
): Promise<ProcessedRecommendation[]> {
  // GraphQL query for product recommendations
  const query = `
    query GetProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url(transform: {preferredContentType: PNG, maxHeight: 500, maxWidth: 500})
              altText
            }
          }
        }
      }
    }
  `;

  const variables = {
    productId,
  };

  try {
    // Fetch data from Shopify
    const response = await shopifyFetch<ShopifyApiResponse>({
      query,
      variables,
    });

    // Check for GraphQL errors
    if (response.body.errors && response.body.errors.length > 0) {
      console.error("GraphQL errors:", response.body.errors);
      return [];
    }

    // Check if data exists and has recommendations
    const recommendations = response.body.data?.productRecommendations;

    if (
      !recommendations ||
      !Array.isArray(recommendations) ||
      recommendations.length === 0
    ) {
      console.log("No product recommendations found");
      return [];
    }

    // Process and return recommendations
    return recommendations.map((rec) => ({
      id: rec.id,
      title: rec.title,
      handle: rec.handle,
      price: rec.priceRange.minVariantPrice.amount,
      currencyCode: rec.priceRange.minVariantPrice.currencyCode,
      featuredImage: {
        url: rec.images.edges[0]?.node.url || "/placeholder.svg",
        altText: rec.images.edges[0]?.node.altText || rec.title,
      },
    }));
  } catch (error) {
    console.error("Error fetching product recommendations:", error);
    return [];
  }
}
