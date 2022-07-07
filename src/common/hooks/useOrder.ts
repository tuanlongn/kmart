import { useMemo, useState } from "react";
import { PaymentTypes, OrderStatus } from "@prisma/client";

import useCart from "./useCart";
import {
  PaymentInput,
  useCreateMyOrderMutation,
  useGetMyOrderLazyQuery,
  useGetMyOrdersLazyQuery,
} from "../../graphql/__generated__/resolvers-types";

export default function useOrder() {
  const { refetchCart, totalPrice, clearSelectedCartItems } = useCart();

  const [paymentOne, setPaymentOne] = useState<PaymentInput | null>(null);
  const [paymentTwo, setPaymentTwo] = useState<PaymentInput | null>(null);

  const payments = useMemo(() => {
    let _payments: { [key: string]: number } = {};
    if (paymentOne?.type) {
      _payments[paymentOne.type] = paymentOne.value;
    }
    if (paymentTwo?.type) {
      _payments[paymentTwo.type] = paymentTwo.value;
    }
    return _payments;
  }, [paymentOne, paymentTwo]);

  const setPayment = (type: PaymentTypes, value: number) => {
    if (type === paymentOne?.type) {
      if (value >= totalPrice) {
        setPaymentOne({ type, value: totalPrice });
        setPaymentTwo(null);
      } else {
        setPaymentOne({ type, value });
        if (paymentTwo && value + paymentTwo.value > totalPrice) {
          setPaymentTwo({ type: paymentTwo.type, value: totalPrice - value });
        }
      }
    } else if (type === paymentTwo?.type) {
      if (value >= totalPrice) {
        setPaymentTwo({ type, value: totalPrice });
        setPaymentOne(null);
      } else {
        setPaymentTwo({ type, value });
        if (paymentOne && value + paymentOne.value > totalPrice) {
          setPaymentOne({ type: paymentOne.type, value: totalPrice - value });
        }
      }
    } else {
      if (paymentOne) {
        setPaymentTwo({ type, value });
      } else if (paymentTwo) {
        setPaymentOne({ type, value });
      } else {
        setPaymentOne({ type, value });
      }
    }
  };

  const removePayment = (type: PaymentTypes) => {
    if (type === paymentOne?.type) {
      setPaymentOne(null);
    } else if (type === paymentTwo?.type) {
      setPaymentTwo(null);
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

  const [createMyOrder, { data: newOrderData, loading: creatingMyOrder }] =
    useCreateMyOrderMutation({
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

  const createOrder = async (
    cartItemIDs: string[],
    payments: PaymentInput[],
    status: OrderStatus
  ) => {
    const result = await createMyOrder({
      variables: {
        cartItemIDs,
        payments,
        status,
      },
    });

    if (
      result.data?.createMyOrder.__typename === "MutationCreateMyOrderSuccess"
    ) {
      clearSelectedCartItems(cartItemIDs);
      return result.data.createMyOrder.data.id;
    }
    return null;
  };

  const loading = useMemo(() => {
    return fetchingMyOrders || fetchingMyOrder || creatingMyOrder;
  }, [fetchingMyOrders, fetchingMyOrder, creatingMyOrder]);

  return {
    orderListData: fetchedOrderDataList?.myOrders || [],
    orderData: fetchCurrentOrderData?.myOrder || null,
    createOrder,
    newOrderData,
    payments,
    setPayment,
    removePayment,
    fetchOrders,
    fetchCurrentOrder,
    loading,
  };
}
