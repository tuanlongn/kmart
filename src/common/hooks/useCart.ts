import { useMemo } from "react";
import {
  useAddToCartMutation,
  useGetMyCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../graphql/__generated__/resolvers-types";

export default function useCart() {
  const {
    data: fetchedData,
    loading: fetchingData,
    refetch,
  } = useGetMyCartQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [addToCart, { loading: addingCartItem }] = useAddToCartMutation({
    onCompleted: (data) => {
      if (data.addCartItem.__typename === "MutationAddCartItemSuccess") {
        refetch();
      } else if (data.addCartItem.__typename === "LogicalError") {
        console.warn(data.addCartItem.message);
      } else if (data.addCartItem.__typename === "ArgumentError") {
        console.warn(
          data.addCartItem.fieldErrors.map((e) => e.message).join(", ")
        );
      }
    },
  });

  const [updateCart, { loading: updatingCartItem }] = useUpdateCartItemMutation(
    {
      onCompleted: (data) => {
        if (
          data.updateCartItem.__typename === "MutationUpdateCartItemSuccess"
        ) {
          refetch();
        } else if (data.updateCartItem.__typename === "LogicalError") {
          console.warn(data.updateCartItem.message);
        } else if (data.updateCartItem.__typename === "ArgumentError") {
          console.warn(
            data.updateCartItem.fieldErrors.map((e) => e.message).join(", ")
          );
        }
      },
    }
  );

  const [removeCart, { loading: removingCartItem }] = useRemoveCartItemMutation(
    {
      onCompleted: (data) => {
        if (
          data.removeCartItem.__typename === "MutationRemoveCartItemSuccess"
        ) {
          refetch();
        } else if (data.removeCartItem.__typename === "LogicalError") {
          console.warn(data.removeCartItem.message);
        } else if (data.removeCartItem.__typename === "ArgumentError") {
          console.warn(
            data.removeCartItem.fieldErrors.map((e) => e.message).join(", ")
          );
        }
      },
    }
  );

  const totalPrice = useMemo(() => {
    let total = 0;
    if (fetchedData) {
      const priceList = fetchedData.myCart.map(
        (item) => item.productVariant.price
      );
      if (priceList.length > 0) {
        total = priceList.reduce((a, b) => a + b);
      }
    }
    return total;
  }, [fetchedData]);

  const totalQuantity = useMemo(() => {
    let total = 0;
    if (fetchedData) {
      const quantityList = fetchedData.myCart.map((item) => item.quantity);
      if (quantityList.length > 0) {
        total = quantityList.reduce((a, b) => a + b);
      }
    }
    return total;
  }, [fetchedData]);

  const loading = useMemo(() => {
    return (
      fetchingData || addingCartItem || updatingCartItem || removingCartItem
    );
  }, [fetchingData, addingCartItem, updatingCartItem, removingCartItem]);

  return {
    cartData: fetchedData?.myCart || [],
    totalPrice,
    totalQuantity,
    addToCart,
    updateCart,
    removeCart,
    loading,
  };
}
