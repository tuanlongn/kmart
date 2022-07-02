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

export type ArgumentError = Error & {
  __typename?: 'ArgumentError';
  fieldErrors: Array<ZodFieldError>;
  message: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  productVariant: ProductVariant;
  quantity: Scalars['Int'];
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

export type Error = {
  message: Scalars['String'];
};

export type LogicalError = Error & {
  __typename?: 'LogicalError';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCartItem: MutationAddCartItemResult;
  createMyOrder: MutationCreateMyOrderResult;
  removeCartItem: MutationRemoveCartItemResult;
  updateCartItem: MutationUpdateCartItemResult;
};


export type MutationAddCartItemArgs = {
  quantity: Scalars['Int'];
  variantId: Scalars['String'];
};


export type MutationCreateMyOrderArgs = {
  cartItemIDs: Array<Scalars['String']>;
  status: Scalars['String'];
};


export type MutationRemoveCartItemArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCartItemArgs = {
  id: Scalars['String'];
  quantity: Scalars['Int'];
};

export type MutationAddCartItemResult = ArgumentError | LogicalError | MutationAddCartItemSuccess;

export type MutationAddCartItemSuccess = {
  __typename?: 'MutationAddCartItemSuccess';
  data: CartItem;
};

export type MutationCreateMyOrderResult = ArgumentError | LogicalError | MutationCreateMyOrderSuccess;

export type MutationCreateMyOrderSuccess = {
  __typename?: 'MutationCreateMyOrderSuccess';
  data: Order;
};

export type MutationRemoveCartItemResult = ArgumentError | LogicalError | MutationRemoveCartItemSuccess;

export type MutationRemoveCartItemSuccess = {
  __typename?: 'MutationRemoveCartItemSuccess';
  data: CartItem;
};

export type MutationUpdateCartItemResult = ArgumentError | LogicalError | MutationUpdateCartItemSuccess;

export type MutationUpdateCartItemSuccess = {
  __typename?: 'MutationUpdateCartItemSuccess';
  data: CartItem;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  items: Array<CartItem>;
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
  me: User;
  myCart: Array<CartItem>;
  myOrder: Order;
  myOrders: Array<Order>;
  order: Order;
  orders: Array<Order>;
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


export type QueryMyOrderArgs = {
  id: Scalars['String'];
};


export type QueryMyOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryOrdersArgs = {
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

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message: Scalars['String'];
  path: Array<Scalars['String']>;
};

export type AddToCartMutationVariables = Exact<{
  variantId: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addCartItem: { __typename?: 'ArgumentError', fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> } | { __typename?: 'LogicalError', message: string } | { __typename?: 'MutationAddCartItemSuccess', data: { __typename?: 'CartItem', id: string } } };

export type CreateMyOrderMutationVariables = Exact<{
  cartItemIDs: Array<Scalars['String']> | Scalars['String'];
  status: Scalars['String'];
}>;


export type CreateMyOrderMutation = { __typename?: 'Mutation', createMyOrder: { __typename?: 'ArgumentError', fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> } | { __typename?: 'LogicalError', message: string } | { __typename?: 'MutationCreateMyOrderSuccess', data: { __typename?: 'Order', id: string } } };

export type GetCategoriesWithProductsQueryVariables = Exact<{
  categoryLimit?: InputMaybe<Scalars['Int']>;
  categoryOffset?: InputMaybe<Scalars['Int']>;
  productLimit?: InputMaybe<Scalars['Int']>;
  productOffset?: InputMaybe<Scalars['Int']>;
}>;


export type GetCategoriesWithProductsQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, products: Array<{ __typename?: 'Product', id: string, name: string, labelPrice?: number | null, description?: string | null, variants: Array<{ __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string, position: number } }> }> }> };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { __typename?: 'Query', myCart: Array<{ __typename?: 'CartItem', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, image: { __typename?: 'ProductImage', id: string, source: string }, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> };

export type GetMyOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMyOrderQuery = { __typename?: 'Query', myOrder: { __typename?: 'Order', id: string, status: string, items: Array<{ __typename?: 'CartItem', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> } };

export type GetMyOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetMyOrdersQuery = { __typename?: 'Query', myOrders: Array<{ __typename?: 'Order', id: string, status: string, items: Array<{ __typename?: 'CartItem', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> }> };

export type GetOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, status: string, items: Array<{ __typename?: 'CartItem', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, status: string, items: Array<{ __typename?: 'CartItem', id: string, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, title?: string | null, price: number, product: { __typename?: 'Product', id: string, name: string, labelPrice?: number | null } } }> }> };

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

export type RemoveCartItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveCartItemMutation = { __typename?: 'Mutation', removeCartItem: { __typename?: 'ArgumentError', fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> } | { __typename?: 'LogicalError', message: string } | { __typename?: 'MutationRemoveCartItemSuccess', data: { __typename?: 'CartItem', id: string } } };

export type UpdateCartItemMutationVariables = Exact<{
  id: Scalars['String'];
  quantity: Scalars['Int'];
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'ArgumentError', fieldErrors: Array<{ __typename?: 'ZodFieldError', message: string, path: Array<string> }> } | { __typename?: 'LogicalError', message: string } | { __typename?: 'MutationUpdateCartItemSuccess', data: { __typename?: 'CartItem', id: string } } };


export const AddToCartDocument = gql`
    mutation AddToCart($variantId: String!, $quantity: Int!) {
  addCartItem(variantId: $variantId, quantity: $quantity) {
    ... on MutationAddCartItemSuccess {
      data {
        id
      }
    }
    ... on ArgumentError {
      fieldErrors {
        message
        path
      }
    }
    ... on LogicalError {
      message
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
export const CreateMyOrderDocument = gql`
    mutation CreateMyOrder($cartItemIDs: [String!]!, $status: String!) {
  createMyOrder(cartItemIDs: $cartItemIDs, status: $status) {
    ... on MutationCreateMyOrderSuccess {
      data {
        id
      }
    }
    ... on ArgumentError {
      fieldErrors {
        message
        path
      }
    }
    ... on LogicalError {
      message
    }
  }
}
    `;
export type CreateMyOrderMutationFn = Apollo.MutationFunction<CreateMyOrderMutation, CreateMyOrderMutationVariables>;

/**
 * __useCreateMyOrderMutation__
 *
 * To run a mutation, you first call `useCreateMyOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyOrderMutation, { data, loading, error }] = useCreateMyOrderMutation({
 *   variables: {
 *      cartItemIDs: // value for 'cartItemIDs'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateMyOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateMyOrderMutation, CreateMyOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMyOrderMutation, CreateMyOrderMutationVariables>(CreateMyOrderDocument, options);
      }
export type CreateMyOrderMutationHookResult = ReturnType<typeof useCreateMyOrderMutation>;
export type CreateMyOrderMutationResult = Apollo.MutationResult<CreateMyOrderMutation>;
export type CreateMyOrderMutationOptions = Apollo.BaseMutationOptions<CreateMyOrderMutation, CreateMyOrderMutationVariables>;
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
    quantity
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
export const GetMyOrderDocument = gql`
    query GetMyOrder($id: String!) {
  myOrder(id: $id) {
    id
    status
    items {
      id
      quantity
      productVariant {
        id
        title
        price
        product {
          id
          name
          labelPrice
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyOrderQuery__
 *
 * To run a query within a React component, call `useGetMyOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMyOrderQuery(baseOptions: Apollo.QueryHookOptions<GetMyOrderQuery, GetMyOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrderQuery, GetMyOrderQueryVariables>(GetMyOrderDocument, options);
      }
export function useGetMyOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrderQuery, GetMyOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrderQuery, GetMyOrderQueryVariables>(GetMyOrderDocument, options);
        }
export type GetMyOrderQueryHookResult = ReturnType<typeof useGetMyOrderQuery>;
export type GetMyOrderLazyQueryHookResult = ReturnType<typeof useGetMyOrderLazyQuery>;
export type GetMyOrderQueryResult = Apollo.QueryResult<GetMyOrderQuery, GetMyOrderQueryVariables>;
export const GetMyOrdersDocument = gql`
    query GetMyOrders($limit: Int, $offset: Int) {
  myOrders(limit: $limit, offset: $offset) {
    id
    status
    items {
      id
      quantity
      productVariant {
        id
        title
        price
        product {
          id
          name
          labelPrice
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersQueryResult = Apollo.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($id: String!) {
  order(id: $id) {
    id
    status
    items {
      id
      quantity
      productVariant {
        id
        title
        price
        product {
          id
          name
          labelPrice
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  orders {
    id
    status
    items {
      id
      quantity
      productVariant {
        id
        title
        price
        product {
          id
          name
          labelPrice
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
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
export const RemoveCartItemDocument = gql`
    mutation RemoveCartItem($id: String!) {
  removeCartItem(id: $id) {
    ... on MutationRemoveCartItemSuccess {
      data {
        id
      }
    }
    ... on ArgumentError {
      fieldErrors {
        message
        path
      }
    }
    ... on LogicalError {
      message
    }
  }
}
    `;
export type RemoveCartItemMutationFn = Apollo.MutationFunction<RemoveCartItemMutation, RemoveCartItemMutationVariables>;

/**
 * __useRemoveCartItemMutation__
 *
 * To run a mutation, you first call `useRemoveCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartItemMutation, { data, loading, error }] = useRemoveCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCartItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument, options);
      }
export type RemoveCartItemMutationHookResult = ReturnType<typeof useRemoveCartItemMutation>;
export type RemoveCartItemMutationResult = Apollo.MutationResult<RemoveCartItemMutation>;
export type RemoveCartItemMutationOptions = Apollo.BaseMutationOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const UpdateCartItemDocument = gql`
    mutation UpdateCartItem($id: String!, $quantity: Int!) {
  updateCartItem(id: $id, quantity: $quantity) {
    ... on MutationUpdateCartItemSuccess {
      data {
        id
      }
    }
    ... on ArgumentError {
      fieldErrors {
        message
        path
      }
    }
    ... on LogicalError {
      message
    }
  }
}
    `;
export type UpdateCartItemMutationFn = Apollo.MutationFunction<UpdateCartItemMutation, UpdateCartItemMutationVariables>;

/**
 * __useUpdateCartItemMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemMutation, { data, loading, error }] = useUpdateCartItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useUpdateCartItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemMutation, UpdateCartItemMutationVariables>(UpdateCartItemDocument, options);
      }
export type UpdateCartItemMutationHookResult = ReturnType<typeof useUpdateCartItemMutation>;
export type UpdateCartItemMutationResult = Apollo.MutationResult<UpdateCartItemMutation>;
export type UpdateCartItemMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables>;