import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import useOrder from "../../common/hooks/useOrder";
import {
  currency,
  displayTime,
  orderNumber,
  orderStatusText,
  paymentText,
} from "../../common/utils";
import FrontLayout from "../../components/Layout/FrontLayout";
import PaymentIcon from "../../components/Payment/PaymentIcon";

enum Page {
  DETECTING,
  LIST,
  ITEM,
}

export default function OrderPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const page = useMemo(() => {
    if (orderId === "list") return Page.LIST;
    if (orderId) return Page.ITEM;
    return Page.DETECTING;
  }, [orderId]);

  const { fetchOrders, fetchCurrentOrder, orderListData, orderData } =
    useOrder();

  useEffect(() => {
    if (page === Page.LIST) {
      fetchOrders({
        variables: {
          limit: 5,
          offset: 0,
        },
      });
    } else if (page === Page.ITEM) {
      fetchCurrentOrder({ variables: { id: orderId as string } });
    }
  }, [page, fetchCurrentOrder, fetchOrders, orderId]);

  if (page === Page.LIST) {
    return (
      <div className="order-list p-3">
        {orderListData.map((order) => (
          <div
            key={order.id}
            className="OrderItem flex flex-col border-b-[4px] border-gray-100 mt-2"
          >
            <div className="OrderNumber font-semibold underline underline-offset-4">
              No: {orderNumber(order.id)}
            </div>
            <div className="OrderInfo flex justify-between border-[1px] p-2 text-sm">
              <div className="flex flex-col">
                <div className="flex">
                  {order.items.map((item, i) => {
                    if (i < 4) {
                      return (
                        <div className="mr-1.5">
                          <Image
                            key={item.id}
                            className="rounded-md"
                            src={item.productVariant.image.source}
                            alt={`${item.productVariant.product.name}-${item.productVariant.title}`}
                            width={40}
                            height={40}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="flex flex-col">
                  {order.items.map(
                    (item, i) =>
                      i < 2 && (
                        <div key={item.id} className="">
                          {`${item.productVariant.product.name}-${item.productVariant.title}`}
                          {i === 1 && order.items.length > 2 && "..."}
                        </div>
                      )
                  )}
                </div>
              </div>

              <div className="grow flex flex-col items-end">
                <div className="">{displayTime(order.createdAt)}</div>
                <div className="">
                  {order.items
                    .map((item) => item.quantity)
                    .reduce((a, b) => a + b)}{" "}
                  sản phẩm
                </div>
              </div>
            </div>

            <div className="OrderPayment border-[1px]">
              <div className="bg-green-200 px-2 py-1">
                {orderStatusText(order.status)}
              </div>
              <div className="text-sm">
                {order.transactions.map((item) => (
                  <div
                    key={item.paymentType}
                    className="flex items-center justify-between px-2 py-1"
                  >
                    <div className="flex items-center">
                      <PaymentIcon type={item.paymentType} />
                      <div className="ml-1">
                        {paymentText(item.paymentType)}
                      </div>
                    </div>
                    <div className="flex">
                      {currency(item.value)}
                      <div className="text-xs mt-0 ml-0.5">đ</div>
                    </div>
                  </div>
                ))}
              </div>
              {order.transactions.length > 0 && (
                <div className="flex justify-between border-t-[1px] border-dashed p-2 text-sm">
                  <div>Tổng tiền</div>
                  <div className="flex font-semibold">
                    {currency(
                      order.transactions
                        .map((item) => item.value)
                        .reduce((a, b) => a + b)
                    )}
                    <div className="text-xs mt-0 ml-0.5">đ</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (page === Page.ITEM) {
    return <div>item</div>;
  } else {
    return <div>Loading...</div>;
  }
}

OrderPage.Layout = FrontLayout;
