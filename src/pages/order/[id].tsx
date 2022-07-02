import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import useOrder from "../../common/hooks/useOrder";

enum Page {
  DETECTING,
  LIST,
  ITEM,
}

interface Props {
  //
}

const OrderPage: NextPage<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const page = useMemo(() => {
    if (id === "list") return Page.LIST;
    if (id) return Page.ITEM;
    return Page.DETECTING;
  }, [id]);

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
      fetchCurrentOrder({ variables: { id: id as string } });
    }
  }, [page]);

  if (page === Page.LIST) {
    return <div>list</div>;
  } else if (page === Page.ITEM) {
    return <div>item</div>;
  } else {
    return <div>Loading...</div>;
  }
};

export default OrderPage;
