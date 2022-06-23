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
  product: Product;
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
  images: Array<ProductImage>;
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
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  me: User;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};


export type QueryCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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

export type GetCategoriesWithProductsQueryVariables = Exact<{
  categoryLimit?: InputMaybe<Scalars['Int']>;
  categoryOffset?: InputMaybe<Scalars['Int']>;
  productLimit?: InputMaybe<Scalars['Int']>;
  productOffset?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesWithProductsQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, products: Array<{ __typename?: 'Product', id: string, name: string, labelPrice?: number | null, description?: string | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string } }> }> }> };

export type GetProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, labelPrice?: number | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string } }>, images: Array<{ __typename?: 'ProductImage', id: string, position: number, source: string }> }> };


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
      }
      title
      price
    }
    images {
      id
      position
      source
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