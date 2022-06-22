import type { NextPage } from "next";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment } from "react";
import { useGetCategoriesWithProductsQuery } from "../graphql/__generated__/resolvers-types";
import ProductItemHome from "../components/ProductItem/ProductItemHome";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const { loading, error, data } = useGetCategoriesWithProductsQuery({
    variables: {
      categoryLimit: 10,
      categoryOffset: 0,
      productLimit: 4,
      productOffset: 0,
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
          <div className="product-list flex">
            {category.products.map((product) => (
              <Fragment key={product.id}>
                {product.variants.map((variant) => (
                  <ProductItemHome
                    key={variant.id}
                    name={product.name}
                    image={variant.image.source}
                    labelPrice={product.labelPrice}
                    price={variant.price}
                  />
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
