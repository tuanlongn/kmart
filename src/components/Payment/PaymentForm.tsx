import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ArrowLeft as BackIcon,
  ShoppingCart as CartIcon,
  CreditCard as PaymentIcon,
} from "react-feather";

import useCart from "../../common/hooks/useCart";
import PaymentInput from "./PaymentInput";
import { PaymentTypes } from "@prisma/client";
import useOrder from "../../common/hooks/useOrder";

type Props = {
  isPage?: boolean;
};

export default function Payment({ isPage = false }: Props) {
  const router = useRouter();
  const { selected, cartData, totalPrice, selectedQuantity } = useCart();
  const { payments, setPayment } = useOrder();

  const cartItems = useMemo(() => {
    return cartData.filter((item) => selected.includes(item.id));
  }, [cartData, selected]);
  console.log(cartItems);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div
        className={`flex items-center px-4 py-5 border-b-[1px]  ${
          isPage && ""
        }`}
      >
        {isPage && (
          <div className="-ml-1" onClick={() => router.back()}>
            <BackIcon strokeWidth={1.5} size={28} color="#2f363d" />
          </div>
        )}
        <div
          className={`grow flex items-center font-semibold text-xl ${
            isPage && "ml-3"
          }`}
        >
          Thanh toán đơn hàng
        </div>
      </div>

      <div className="overflow-y-auto p-4 pb-30">
        <div className="flex items-center mb-3">
          <CartIcon strokeWidth={1.5} size={24} color="#2f363d" />
          <h4 className="ml-2 font-semibold">Giỏ hàng</h4>
        </div>

        <div className="flex justify-between">
          <div className="grow relative">
            {cartItems.map((item, i) => (
              <div key={item.id} className={`absolute top-0 left-${i}`}>
                <Image
                  className="rounded-md drop-shadow"
                  src={item.productVariant.image.source}
                  alt={item.productVariant.product.name}
                  width={60}
                  height={60}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end">
            <div>{selectedQuantity} sản phẩm</div>
            <div className="flex font-semibold text-xl">
              {new Intl.NumberFormat("vi-VN").format(totalPrice)}
              <div className="text-xs mt-0 ml-0.5">đ</div>
            </div>
          </div>
        </div>

        <div className="flex items-center border-t-[1px] pt-4 mt-8 mb-3">
          <PaymentIcon strokeWidth={1.5} size={24} color="#2f363d" />
          <h4 className="ml-2 font-semibold">Hình thức thanh toán</h4>
        </div>
        <div>
          <div>
            <PaymentInput type={PaymentTypes.MOMO} />
            <PaymentInput type={PaymentTypes.CASH} />
            <PaymentInput type={PaymentTypes.BANK_TRANSFER} />
            <PaymentInput type={PaymentTypes.VOUCHER} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white drop-shadow-2xl">
        <button
          className="w-full bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-red-500 disabled:opacity-75 rounded-md text-center"
          onClick={() => null}
          disabled={false}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
