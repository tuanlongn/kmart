import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import useOrder from "../../common/hooks/useOrder";
import FrontLayout from "../../components/Layout/FrontLayout";

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
      <div className="order-list">
        {orderListData.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-item-left">
              <div className="flex flex-col border-b-[1px]">
                <div className="images relative">
                  {order.items.map((item, i) => (
                    <div
                      key={item.id}
                      className={`absolute top-0 left-${i * 2}`}
                    >
                      <Image
                        className="rounded-md "
                        src={item.productVariant.image.source}
                        alt={`${item.productVariant.product.name}-${item.productVariant.title}`}
                        width={60}
                        height={60}
                      />
                    </div>
                  ))}
                </div>
                <div className="">
                  {order.items.map(
                    (item, i) =>
                      i < 2 && (
                        <div
                          key={item.id}
                          className=""
                        >{`${item.productVariant.product.name}-${item.productVariant.title}`}</div>
                      )
                  )}
                </div>
              </div>

              <div className="">
                {order.items
                  .map((item) => item.quantity)
                  .reduce((a, b) => a + b)}{" "}
                sản phẩm
              </div>
            </div>

            <div className="order-item-right">
              <div className=""></div>
              <div className="">{order.status}</div>
              <div className="">{order.status}</div>
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
