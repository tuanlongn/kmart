import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../store/apollo";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps: { session, initialApolloState, ...pageProps },
}: AppProps) {
  const client = useApollo(initialApolloState);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
