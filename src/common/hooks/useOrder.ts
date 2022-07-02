import { useMemo } from "react";

import useCart from "./useCart";
import {
  useCreateMyOrderMutation,
  useGetMyOrderLazyQuery,
  useGetMyOrdersLazyQuery,
} from "../../graphql/__generated__/resolvers-types";

export default function useOrder() {
  const { refetchCart } = useCart();

  const [
    fetchOrders,
    { data: fetchedOrderDataList, loading: fetchingMyOrders },
  ] = useGetMyOrdersLazyQuery();

  const [
    fetchCurrentOrder,
    { data: fetchCurrentOrderData, loading: fetchingMyOrder },
  ] = useGetMyOrderLazyQuery();

  const [createOrder, { loading: creatingOrder }] = useCreateMyOrderMutation({
    onCompleted: (data) => {
      if (data.createMyOrder.__typename === "MutationCreateMyOrderSuccess") {
        refetchCart();
      } else if (data.createMyOrder.__typename === "LogicalError") {
        console.warn(data.createMyOrder.message);
      } else if (data.createMyOrder.__typename === "ArgumentError") {
        console.warn(
          data.createMyOrder.fieldErrors.map((e) => e.message).join(", ")
        );
      }
    },
  });

  const loading = useMemo(() => {
    return fetchingMyOrders || fetchingMyOrder || creatingOrder;
  }, [fetchingMyOrders, fetchingMyOrder, creatingOrder]);

  return {
    orderListData: fetchedOrderDataList?.myOrders || [],
    orderData: fetchCurrentOrderData?.myOrder || null,
    createOrder,
    fetchOrders,
    fetchCurrentOrder,
    loading,
  };
}
