import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  CartItem,
  useAddToCartMutation,
  useGetMyCartQuery,
} from "../../graphql/__generated__/resolvers-types";

export default function useCart() {
  const { data: fetchData, refetch } = useGetMyCartQuery({});

  const [addToCart, { data: newCartItem }] = useAddToCartMutation({
    onCompleted: () => refetch({}),
  });

  const total = useMemo(() => {
    return fetchData
      ? fetchData.myCart
          .map((item) => item.productVariant.price)
          .reduce((a, b) => a + b)
      : 0;
  }, [fetchData]);

  return { cartData: fetchData?.myCart || [], total, addToCart };
}
