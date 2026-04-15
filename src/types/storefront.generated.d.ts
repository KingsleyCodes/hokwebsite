/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetSearchedProductsQueryVariables = StorefrontTypes.Exact<{
  query: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetSearchedProductsQuery = { search: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle'>
        & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, featuredImage?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url'>> }
      ) }> } };

interface GeneratedQueryTypes {
  "query GetSearchedProducts($query: String!) {\n  search(\n    query: $query\n    prefix: LAST\n    first: 10\n    sortKey: RELEVANCE\n    types: PRODUCT\n  ) {\n    edges {\n      node {\n        ... on Product {\n          id\n          title\n          priceRange {\n            maxVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          handle\n          featuredImage {\n            url(\n              transform: {crop: CENTER, maxHeight: 50, maxWidth: 100, preferredContentType: PNG}\n            )\n          }\n        }\n      }\n    }\n  }\n}": {return: GetSearchedProductsQuery, variables: GetSearchedProductsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
