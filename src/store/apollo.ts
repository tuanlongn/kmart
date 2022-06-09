import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphicLink() {
  if (typeof window === "undefined") {
    // server
    const { SchemaLink } = require("@apollo/client/link/schema");
    const schema = require("../graphql/schema");
    console.log(schema);
    return new SchemaLink({ schema });
  } else {
    // client
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({ uri: "/api/graphql" });
  }
}

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphicLink(),
    cache: new InMemoryCache(),
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
