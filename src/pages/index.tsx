import type { GetStaticProps, NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  Category,
  GetCategoriesWithProductsDocument,
  useGetCategoriesWithProductsQuery,
} from "../graphql/__generated__/resolvers-types";
import ProductItemHome from "../components/ProductItem/ProductItemHome";
import { initializeApollo } from "../store/apollo";
import usePageBottom from "../common/hooks/usePageBottom";

interface Props {
  categories: Category[];
}

const Home: NextPage<Props> = ({ categories }) => {
  // const { data: session, status } = useSession();

  const {
    loading,
    error,
    data: fetchData,
    fetchMore,
  } = useGetCategoriesWithProductsQuery({
    variables: {
      categoryLimit: 5,
      categoryOffset: 0,
      productLimit: 5,
      productOffset: 0,
    },
    // fetchPolicy: "no-cache",
    // notifyOnNetworkStatusChange: true,
  });

  console.log(
    "fetchData",
    fetchData?.categories.map((item) => item.name)
  );

  const data = useMemo(() => {
    if (fetchData) {
      return [...fetchData.categories];
    }
    return [...categories];
  }, [fetchData?.categories.map((item) => item.id)]);

  const isPageBottom = usePageBottom();

  useEffect(() => {
    if (isPageBottom) {
      console.log("trigger fetchMore");
      fetchMore({
        variables: {
          categoryOffset: data.length,
        },
      });
    }
  }, [isPageBottom]);

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
      {data.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <div className="product-list">
            <Swiper slidesPerView={3} spaceBetween={0} className="mySwiper">
              {category.products.map((product) => (
                <Fragment key={product.id}>
                  {product.variants.map((variant) => (
                    <SwiperSlide key={variant.id}>
                      <ProductItemHome
                        name={product.name}
                        image={variant.image.source}
                        labelPrice={product.labelPrice}
                        price={variant.price}
                      />
                    </SwiperSlide>
                  ))}
                </Fragment>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const client = initializeApollo(null);
  const { data } = await client.query({
    query: GetCategoriesWithProductsDocument,
    variables: {
      categoryLimit: 5,
      categoryOffset: 0,
      productLimit: 4,
      productOffset: 0,
    },
  });

  return {
    props: {
      categories: data.categories,
    },
    revalidate: 10 * 60, // seconds
  };
};

export default Home;
