/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/lib/shopify/types";
import { shopifyFetch } from ".";

// Step 1: Create a cart and add line items

export async function createCart(items: CartItem[]) {
  // Format lines ensuring proper IDs (may need gid:// format)
  const lines = items.map((item) => {
    let merchandiseId = item.variantId || item.productId;

    // Ensure ID is in expected format for Shopify Storefront API
    if (merchandiseId && !merchandiseId.startsWith("gid://")) {
      merchandiseId = item.variantId
        ? `gid://shopify/ProductVariant/${item.variantId}`
        : `gid://shopify/Product/${item.productId}`;
    }

    return {
      merchandiseId,
      quantity: item.quantity,
    };
  });

  console.log("Creating cart with lines:", JSON.stringify(lines, null, 2));

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines,
    },
  };

  try {
    const response = await shopifyFetch({ query, variables });
    console.log("Cart Create Response - Status:", response.status);
    console.log(
      "Cart Create Response - Body:",
      JSON.stringify(response.body, null, 2),
    );

    // Cast the response body to the expected type
    const responseBody = response.body as any;

    // Check for GraphQL errors
    if (responseBody.errors) {
      console.error("GraphQL errors:", responseBody.errors);
      throw new Error(`GraphQL Error: ${responseBody.errors[0].message}`);
    }

    // Check for data existence
    if (!responseBody.data) {
      console.error("No data in response:", responseBody);
      throw new Error("Invalid API response - no data returned");
    }

    // Check for cartCreate existence
    if (!responseBody.data.cartCreate) {
      console.error("No cartCreate in response:", responseBody.data);
      throw new Error("Invalid API response - cartCreate missing");
    }

    // Check for user errors
    if (
      responseBody.data.cartCreate.userErrors &&
      responseBody.data.cartCreate.userErrors.length > 0
    ) {
      console.error("User errors:", responseBody.data.cartCreate.userErrors);
      throw new Error(
        `User Error: ${responseBody.data.cartCreate.userErrors[0].message}`,
      );
    }

    // Check if cart is returned
    if (!responseBody.data.cartCreate.cart) {
      console.error("No cart in response:", responseBody.data.cartCreate);
      throw new Error("Invalid API response - cart missing");
    }

    // Ensure checkout URL exists
    if (!responseBody.data.cartCreate.cart.checkoutUrl) {
      console.error(
        "No checkoutUrl in cart:",
        responseBody.data.cartCreate.cart,
      );
      throw new Error("Checkout URL is missing from the response");
    }

    return responseBody.data.cartCreate.cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

// Step 2: Retrieve a cart
export async function getCart(cartId: string) {
  console.log("Getting cart with ID:", cartId);

  const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `;

  const variables = {
    cartId,
  };

  try {
    const response = await shopifyFetch({
      query,
      variables,
    });

    console.log("Get Cart Response - Status:", response.status);

    // Cast the response body to the expected type
    const responseBody = response.body as any;

    if (responseBody.errors) {
      console.error("GraphQL errors:", responseBody.errors);
      throw new Error(`GraphQL Error: ${responseBody.errors[0].message}`);
    }

    return responseBody.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

// Step 3: Update cart lines
export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
) {
  const query = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

  const variables = {
    cartId,
    lines: lines.map((line) => ({
      id: line.id,
      quantity: line.quantity,
    })),
  };

  try {
    const response = await shopifyFetch({
      query,
      variables,
    });

    // Cast the response body to the expected type
    const responseBody = response.body as any;

    if (responseBody.errors) {
      throw new Error(responseBody.errors[0].message);
    }

    if (responseBody.data?.cartLinesUpdate?.userErrors?.length > 0) {
      throw new Error(responseBody.data.cartLinesUpdate.userErrors[0].message);
    }

    return responseBody.data.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    throw error;
  }
}

// Step 4: Remove cart lines
export async function removeCartLines(cartId: string, lineIds: string[]) {
  const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

  const variables = {
    cartId,
    lineIds,
  };

  try {
    const response = await shopifyFetch({
      query,
      variables,
    });

    // Cast the response body to the expected type
    const responseBody = response.body as any;

    if (responseBody.errors) {
      throw new Error(responseBody.errors[0].message);
    }

    if (responseBody.data?.cartLinesRemove?.userErrors?.length > 0) {
      throw new Error(responseBody.data.cartLinesRemove.userErrors[0].message);
    }

    return responseBody.data.cartLinesRemove.cart;
  } catch (error) {
    console.error("Error removing cart lines:", error);
    throw error;
  }
}
