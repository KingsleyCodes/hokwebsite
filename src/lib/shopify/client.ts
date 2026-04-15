import { ApiVersion } from "@shopify/shopify-api";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || "",
  apiVersion: ApiVersion.April25,
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
});

export default client;