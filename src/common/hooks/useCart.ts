import cuid from "cuid";
import { useMemo } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAddToCartMutation,
  useGetMyCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../graphql/__generated__/resolvers-types";

export interface CartState {
  selectedIDs: string[];
}

export const cartState = atom<CartState>({
  key: "cart",
  default: {
    selectedIDs: [],
  },
  effects: [
    ({ onSet }) => {
      onSet(async (state) => {
        await localStorage.setItem(
          "cart:selectedIDs",
          JSON.stringify(state.selectedIDs)
        );
      });
    },
  ],
});

export default function useCart() {
  const {
    data: fetchedData,
    loading: fetchingData,
    refetch: refetchCart,
  } = useGetMyCartQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [addToCart, { loading: addingCartItem }] = useAddToCartMutation({
    onCompleted: (data) => {
      if (data.addCartItem.__typename === "MutationAddCartItemSuccess") {
        refetchCart();
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
          refetchCart();
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
          refetchCart();
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

  const { selectedIDs } = useRecoilValue(cartState);
  const setCartState = useSetRecoilState(cartState);

  const handleSelectChange = (itemId: string) => {
    if (selectedIDs.includes(itemId)) {
      setCartState((state) => ({
        selectedIDs: selectedIDs.filter((id) => id !== itemId),
      }));
    } else {
      setCartState((state) => ({
        selectedIDs: [...selectedIDs, itemId],
      }));
    }
  };

  const clearSelectedCartItems = (cartItemIDs?: string[]) => {
    if (cartItemIDs) {
      setCartState((state) => ({
        selectedIDs: selectedIDs.filter((id) => !cartItemIDs.includes(id)),
      }));
    }
  };

  const totalPrice: number = useMemo(() => {
    let total = 0;
    if (fetchedData) {
      const priceList = fetchedData.myCart
        .filter((item) => selectedIDs.includes(item.id))
        .map((item) => item.productVariant.price);
      if (priceList.length > 0) {
        total = priceList.reduce((a, b) => a + b);
      }
    }
    return total;
  }, [fetchedData, selectedIDs]);

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

  const selectedQuantity = useMemo(() => {
    let total = 0;
    if (fetchedData) {
      const quantityList = fetchedData.myCart
        .filter((item) => selectedIDs.includes(item.id))
        .map((item) => item.quantity);
      if (quantityList.length > 0) {
        total = quantityList.reduce((a, b) => a + b);
      }
    }
    return total;
  }, [fetchedData, selectedIDs]);

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
    refetchCart,
    loading,
    selected: selectedIDs,
    selectedQuantity,
    handleSelectChange,
    clearSelectedCartItems,
  };
}
