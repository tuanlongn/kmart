import { useMemo, useState } from "react";

import useCart from "./useCart";
import {
  PaymentInput,
  useCreateMyOrderMutation,
  useGetMyOrderLazyQuery,
  useGetMyOrdersLazyQuery,
} from "../../graphql/__generated__/resolvers-types";
import { PaymentTypes } from "@prisma/client";

export default function useOrder() {
  const { refetchCart, totalPrice } = useCart();

  const [paymentState, setPaymentState] = useState<PaymentInput[]>([]);

  const setPayment = (type: PaymentTypes, value: number) => {
    const idx = paymentState.findIndex((p) => p.type === type);
    if (idx) {
      if (value >= totalPrice) {
        paymentState[idx].value = totalPrice;
        setPaymentState([paymentState[idx]]);
      } else {
        paymentState[idx].value = value;
        setPaymentState([...paymentState]);
      }
    } else {
      if (value >= totalPrice) {
        setPaymentState([{ type, value: totalPrice }]);
      } else {
        if (paymentState.length === 1) {
          if (paymentState[0].value + value > totalPrice) {
            setPaymentState([
              { type, value },
              { type: paymentState[0].type, value: totalPrice - value },
            ]);
          }
        } else {
          setPaymentState([{ type, value }]);
        }
      }
    }
  };

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
    payments: paymentState,
    setPayment,
    fetchOrders,
    fetchCurrentOrder,
    loading,
  };
}
