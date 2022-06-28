import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../store/apollo";
import "../styles/globals.css";
import FrontLayout from "../components/Layout/FrontLayout";
import AuthProvider from "../components/AuthProvider";

function MyApp({
  Component,
  pageProps: { session, initialApolloState, ...pageProps },
}: AppProps) {
  const client = useApollo(initialApolloState);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <FrontLayout>
          <Component {...pageProps} />
        </FrontLayout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
