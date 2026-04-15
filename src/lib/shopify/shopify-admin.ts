// This is the admin API for the Shopify custom app that will be used to interact with the Shopify admin API

import "@shopify/shopify-api/adapters/node";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2025-04";

// Initialize the Shopify API
const shopify = shopifyApi({
    apiSecretKey: process.env.SHOPIFY_CUSTOM_APP_API_KEY || "",
    apiVersion: ApiVersion.April25,
    isCustomStoreApp: true,
    adminApiAccessToken: process.env.SHOPIFY_CUSTOM_APP_ADMIN_API_ACCESS_TOKEN || "",
    isEmbeddedApp: false,
    hostName: process.env.SHOPIFY_STORE_DOMAIN || "",
    restResources,
})

export default shopify;
