/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import shopify from "@/lib/shopify/shopify-admin";

interface CreateNewShopifyCustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const createNewShopifyCustomer = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
}: CreateNewShopifyCustomerProps) => {
  const session = shopify.session.customAppSession(
    process.env.SHOPIFY_STORE_DOMAIN || "",
  );

  if (!session) {
    throw new Error("No session found");
  }

  const QUERY = `
      mutation {
        customerCreate(input: {
          firstName: "${firstName}",
          lastName: "${lastName}",
          email: "${email}",
          phone: "${phoneNumber}",
          note: "Wholesaler",
          tags: "wholesaler"
        }) {
          customer {
            id
            firstName
            lastName
            note
            tags
            defaultEmailAddress {
              emailAddress
            }
            defaultPhoneNumber {
              phoneNumber
            }
          }
          userErrors {
            ...UserErrorFragment
          }
        }
      }
      fragment UserErrorFragment on UserError {
        field
        message
      }
  `;

  const CHECK_EMAIL_QUERY = `
    query {
      customers(first: 1, query: "email:${email}") {
        edges {
          node {
            id
            tags
          }
        }
      }
    }
  `;

  const client = new shopify.clients.Graphql({ session });
  try {
    // Check if the email already exists
    const emailCheckResponse = await client.request(CHECK_EMAIL_QUERY);

    if (
      emailCheckResponse.data &&
      emailCheckResponse.data.customers &&
      emailCheckResponse.data.customers.edges &&
      emailCheckResponse.data.customers.edges.length > 0
    ) {
      const customer = emailCheckResponse.data.customers.edges[0].node;
      if (customer.tags.includes("wholesaler")) {
        console.error("This email is already a wholesaler");
        return {
          errors: ["This email is already a wholesaler."],
        };
      }
    }

    const response = await client.request(QUERY, {
      variables: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
      retries: 2,
    });

    console.log("response.data", response.data);
    // console.log("response.errors", response.errors);
    // console.log("response.headers", response.headers);

    if (
      response.data &&
      response.data.customerCreate &&
      response.data.customerCreate.userErrors &&
      response.data.customerCreate.userErrors.length > 0
    ) {
      console.error(
        "Shopify customer creation user errors:",
        response.data.customerCreate.userErrors,
      );
      response.data.customerCreate.userErrors.forEach((error: any) => {
        console.error("Error Field:", error.field);
        console.error("Error Message:", error.message);
      });
      return {
        errors: response.data.customerCreate.userErrors.map(
          (error: any) => error.message,
        ),
      };
    }

    return response;
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      errors: [
        {
          message:
            "Failed to create customer. Please check the logs for more details.",
        },
      ],
    };
  }
};
