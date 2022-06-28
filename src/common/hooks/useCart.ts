import { useMemo } from "react";
import {
  useAddToCartMutation,
  useGetMyCartQuery,
} from "../../graphql/__generated__/resolvers-types";

export default function useCart() {
  const {
    data: fetchData,
    loading: fetchingData,
    refetch,
  } = useGetMyCartQuery({});

  const [addToCart, { data: newCartItem, loading: addingCartItem }] =
    useAddToCartMutation({
      onCompleted: () => refetch({}),
    });

  const total = useMemo(() => {
    return fetchData
      ? fetchData.myCart
          .map((item) => item.productVariant.price)
          .reduce((a, b) => a + b)
      : 0;
  }, [fetchData]);

  const loading = useMemo(
    () => fetchingData || addingCartItem,
    [fetchingData, addingCartItem]
  );

  return {
    cartData: fetchData?.myCart || [],
    total,
    addToCart,
    loading,
  };
}
