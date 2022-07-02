import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../store/apollo";
import "../styles/globals.css";
import FrontLayout from "../components/Layout/FrontLayout";
import AuthProvider from "../components/AuthProvider";
import { cartState } from "../common/hooks/useCart";

function MyApp({
  Component,
  pageProps: { session, initialApolloState, ...pageProps },
}: AppProps) {
  const client = useApollo(initialApolloState);

  return (
    <RecoilRoot
      initializeState={({ set }) => set(cartState, { selectedIDs: [] })}
    >
      <ApolloProvider client={client}>
        <AuthProvider>
          <FrontLayout>
            <Component {...pageProps} />
          </FrontLayout>
        </AuthProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
