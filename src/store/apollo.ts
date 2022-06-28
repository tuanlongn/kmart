import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            categories: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
            // category: {
            //   keyArgs: [],
            //   merge(existing, incoming, args) {
            //     console.log({ existing, incoming, args });
            //     return incoming;
            //   },
            // },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  const client = useMemo(() => initializeApollo(initialState), [initialState]);
  return client;
}
