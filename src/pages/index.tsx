import type { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment } from "react";
import { useGetCategoriesWithProductsQuery } from "../graphql/__generated__/resolvers-types";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const { loading, error, data } = useGetCategoriesWithProductsQuery({
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session?.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }

  // Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>

  return (
    <div>
      {data?.categories.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <div className="list">
            {category.products.map((product) => (
              <Fragment key={product.id}>
                {product.variants.map((variant) => (
                  <div key={variant.id} className="product-item">
                    <Image
                      src={variant.image.source}
                      alt={product.name}
                      layout="fill"
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
