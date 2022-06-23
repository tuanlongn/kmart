import type { GetStaticProps, NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  Category,
  GetCategoriesWithProductsDocument,
  useGetCategoriesWithProductsQuery,
  useGetProductsByCategoryIdLazyQuery,
} from "../graphql/__generated__/resolvers-types";
import ProductItemHome from "../components/ProductItem/ProductItemHome";
import { initializeApollo } from "../store/apollo";
import usePageBottom from "../common/hooks/usePageBottom";

interface Props {
  categories: Category[];
}

const Home: NextPage<Props> = ({ categories = [] }) => {
  // const { data: session, status } = useSession();

  const [data, setData] = useState<Category[]>([]);

  const {
    loading,
    error,
    data: fetchCategoryData,
    fetchMore,
  } = useGetCategoriesWithProductsQuery({
    variables: {
      categoryLimit: 5,
      categoryOffset: 0,
      productLimit: 5,
      productOffset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [
    fetchProducts,
    { data: fetchProductData, fetchMore: fetchMoreProducts },
  ] = useGetProductsByCategoryIdLazyQuery({
    variables: {
      categoryId: "",
      productLimit: 5,
      productOffset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleFetchMoreProduct = (categoryId: string) => {
    const categoryData = data.find((item) => item.id === categoryId);
    console.log("categoryData", categoryData, fetchProductData);
    if (!fetchProductData) {
      fetchProducts({
        variables: {
          categoryId: categoryId,
          productOffset: categoryData?.products.length || 0,
        },
      });
    } else {
      console.log("fetchMoreProducts", categoryData?.products.length);
      fetchMoreProducts({
        variables: {
          categoryId: categoryId,
          productOffset: categoryData?.products.length || 0,
        },
      });
    }
  };

  useEffect(() => {
    if (fetchCategoryData?.categories.map((item) => item.id)) {
      setData(fetchCategoryData.categories);
    } else {
      setData(categories);
    }
  }, [categories, fetchCategoryData]);

  useEffect(() => {
    if (fetchProductData) {
      const _data = data.map((category) => {
        return {
          ...category,
          products:
            category.id === fetchProductData.category.id
              ? [...category.products, ...fetchProductData.category.products]
              : category.products,
        };
      });
      console.log("fetchProductData", fetchProductData, _data);
      setData(_data);
    }
  }, [data, fetchProductData]);

  const isPageBottom = usePageBottom();

  useEffect(() => {
    if (isPageBottom) {
      fetchMore({
        variables: {
          categoryOffset: data.length,
        },
      });
    }
  }, [isPageBottom, data.length, fetchMore]);

  return (
    <div>
      {data.map((category) => (
        <div key={category.id}>
          <div>{category.name}</div>
          <div className="product-list">
            <Swiper
              slidesPerView={3}
              spaceBetween={0}
              className="mySwiper"
              onReachEnd={() => handleFetchMoreProduct(category.id)}
            >
              {category.products.map((product) => (
                <Fragment key={category.id + product.id}>
                  {product.variants.map((variant) => (
                    <SwiperSlide
                      key={`${category.id}-${product.id}-${variant.id}`}
                    >
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
      categories: data.categories || [],
    },
    revalidate: 10 * 60, // seconds
  };
};

export default Home;
