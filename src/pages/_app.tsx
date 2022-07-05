import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { FC, useEffect, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../store/apollo";
import "../styles/globals.css";
import FrontLayout from "../components/Layout/FrontLayout";
import AuthProvider from "../components/AuthProvider";
import { cartState } from "../common/hooks/useCart";

const Noop: FC<{ children: JSX.Element }> = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps: { session, initialApolloState, ...pageProps },
}: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  const client = useApollo(initialApolloState);
  const [isReady, setReady] = useState(false);
  const cacheState = useRef<string[]>([]);

  useEffect(() => {
    const restoreState = async () => {
      const value = localStorage.getItem("cart:selectedIDs");
      if (value) {
        cacheState.current = JSON.parse(value);
      }
      setReady(true);
    };
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <RecoilRoot
      initializeState={({ set }) =>
        set(cartState, { selectedIDs: cacheState.current })
      }
    >
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
