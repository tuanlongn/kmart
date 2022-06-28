import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  productVariant: ProductVariant;
  user: User;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};


export type CategoryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCartItem: CartItem;
};


export type MutationAddCartItemArgs = {
  quantity: Scalars['Int'];
  variantId: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  status: Scalars['String'];
  user: User;
};

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  labelPrice?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  variants: Array<ProductVariant>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id: Scalars['ID'];
  position: Scalars['Int'];
  source: Scalars['String'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Scalars['ID'];
  image: ProductImage;
  price: Scalars['Float'];
  product: Product;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  myCart: Array<CartItem>;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  orders: Array<Order>;
};

export type AddToCartMutationVariables = Exact<{
  variantId: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addCartItem: { __typename?: 'CartItem', id: string, productVariant: { __typename?: 'ProductVariant', id: string, price: number, title?: string | null } } };

export type GetCategoriesWithProductsQueryVariables = Exact<{
  categoryLimit?: InputMaybe<Scalars['Int']>;
  categoryOffset?: InputMaybe<Scalars['Int']>;
  productLimit?: InputMaybe<Scalars['Int']>;
  productOffset?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesWithProductsQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, products: Array<{ __typename?: 'Product', id: string, name: string, labelPrice?: number | null, description?: string | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string, position: number } }> }> }> };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { __typename?: 'Query', myCart: Array<{ __typename?: 'CartItem', id: string, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string }, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> };

export type GetProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, labelPrice?: number | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string, position: number } }> }> };

export type GetProductsByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['String'];
  productLimit?: InputMaybe<Scalars['Int']>;
  productOffset?: InputMaybe<Scalars['Int']>;
}>;


export type GetProductsByCategoryIdQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name: string, description?: string | null, products: Array<{ __typename?: 'Product', id: string, name: string, labelPrice?: number | null, description?: string | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string, position: number } }> }> } };


export const AddToCartDocument = gql`
    mutation AddToCart($variantId: String!, $quantity: Int!) {
  addCartItem(variantId: $variantId, quantity: $quantity) {
    id
    productVariant {
      id
      price
      title
    }
  }
}
    `;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      variantId: // value for 'variantId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const GetCategoriesWithProductsDocument = gql`
    query GetCategoriesWithProducts($categoryLimit: Int, $categoryOffset: Int, $productLimit: Int, $productOffset: Int) {
  categories(limit: $categoryLimit, offset: $categoryOffset) {
    id
    name
    description
    products(limit: $productLimit, offset: $productOffset) {
      id
      name
      labelPrice
      description
      variants {
        id
        title
        price
        image {
          id
          source
          position
        }
      }
    }
  }
}
    `;

/**
 * __useGetCategoriesWithProductsQuery__
 *
 * To run a query within a React component, call `useGetCategoriesWithProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesWithProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesWithProductsQuery({
 *   variables: {
 *      categoryLimit: // value for 'categoryLimit'
 *      categoryOffset: // value for 'categoryOffset'
 *      productLimit: // value for 'productLimit'
 *      productOffset: // value for 'productOffset'
 *   },
 * });
 */
export function useGetCategoriesWithProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesWithProductsQuery, GetCategoriesWithProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesWithProductsQuery, GetCategoriesWithProductsQueryVariables>(GetCategoriesWithProductsDocument, options);
      }
export function useGetCategoriesWithProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesWithProductsQuery, GetCategoriesWithProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesWithProductsQuery, GetCategoriesWithProductsQueryVariables>(GetCategoriesWithProductsDocument, options);
        }
export type GetCategoriesWithProductsQueryHookResult = ReturnType<typeof useGetCategoriesWithProductsQuery>;
export type GetCategoriesWithProductsLazyQueryHookResult = ReturnType<typeof useGetCategoriesWithProductsLazyQuery>;
export type GetCategoriesWithProductsQueryResult = Apollo.QueryResult<GetCategoriesWithProductsQuery, GetCategoriesWithProductsQueryVariables>;
export const GetMyCartDocument = gql`
    query GetMyCart {
  myCart {
    id
    productVariant {
      id
      title
      price
      image {
        id
        source
      }
      product {
        id
        name
        labelPrice
      }
    }
  }
}
    `;

/**
 * __useGetMyCartQuery__
 *
 * To run a query within a React component, call `useGetMyCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCartQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
      }
export function useGetMyCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
        }
export type GetMyCartQueryHookResult = ReturnType<typeof useGetMyCartQuery>;
export type GetMyCartLazyQueryHookResult = ReturnType<typeof useGetMyCartLazyQuery>;
export type GetMyCartQueryResult = Apollo.QueryResult<GetMyCartQuery, GetMyCartQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($limit: Int, $offset: Int) {
  products(limit: $limit, offset: $offset) {
    id
    name
    description
    labelPrice
    variants {
      id
      image {
        id
        source
        position
      }
      title
      price
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsByCategoryIdDocument = gql`
    query GetProductsByCategoryId($categoryId: String!, $productLimit: Int, $productOffset: Int) {
  category(id: $categoryId) {
    id
    name
    description
    products(limit: $productLimit, offset: $productOffset) {
      id
      name
      labelPrice
      description
      variants {
        id
        title
        price
        image {
          id
          source
          position
        }
      }
    }
  }
}
    `;

/**
 * __useGetProductsByCategoryIdQuery__
 *
 * To run a query within a React component, call `useGetProductsByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByCategoryIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      productLimit: // value for 'productLimit'
 *      productOffset: // value for 'productOffset'
 *   },
 * });
 */
export function useGetProductsByCategoryIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByCategoryIdQuery, GetProductsByCategoryIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByCategoryIdQuery, GetProductsByCategoryIdQueryVariables>(GetProductsByCategoryIdDocument, options);
      }
export function useGetProductsByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByCategoryIdQuery, GetProductsByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByCategoryIdQuery, GetProductsByCategoryIdQueryVariables>(GetProductsByCategoryIdDocument, options);
        }
export type GetProductsByCategoryIdQueryHookResult = ReturnType<typeof useGetProductsByCategoryIdQuery>;
export type GetProductsByCategoryIdLazyQueryHookResult = ReturnType<typeof useGetProductsByCategoryIdLazyQuery>;
export type GetProductsByCategoryIdQueryResult = Apollo.QueryResult<GetProductsByCategoryIdQuery, GetProductsByCategoryIdQueryVariables>;