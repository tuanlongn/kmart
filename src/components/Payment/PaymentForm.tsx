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
import { OrderStatus, PaymentTypes } from "@prisma/client";
import useOrder from "../../common/hooks/useOrder";
import toast from "react-hot-toast";

type Props = {
  isPage?: boolean;
};

export default function Payment({ isPage = false }: Props) {
  const router = useRouter();
  const { selected, cartData, totalPrice, selectedQuantity } = useCart();
  const { payments, setPayment, removePayment, createOrder } = useOrder();

  const totalPaymentValues = useMemo(() => {
    const values = Object.values(payments);
    if (values.length > 0) {
      return values.reduce((a, b) => a + b);
    }
    return 0;
  }, [payments]);

  const handleChangePaymentType = (type: PaymentTypes, status: boolean) => {
    if (status) {
      if (Object.keys(payments).length === 0) {
        setPayment(type, totalPrice);
      } else {
        setPayment(type, 0);
      }
    } else {
      removePayment(type);
    }
  };

  const handleChangePaymentValue = (type: PaymentTypes, value: number) => {
    setPayment(type, value);
  };

  const cartItems = useMemo(() => {
    return cartData.filter((item) => selected.includes(item.id));
  }, [cartData, selected]);

  const handleSubmit = async () => {
    if (Object.values(payments).length === 0) {
      toast.error(`Bạn chưa chọn hình thức thanh toán`, {
        id: "noti-payment",
      });
    } else if (totalPaymentValues < totalPrice) {
      toast.error(
        `Tiền thanh toán chưa đủ ${new Intl.NumberFormat("vi-VN").format(
          totalPrice
        )}đ`,
        {
          id: "noti-payment",
        }
      );
    } else {
      const paymentArgs = Object.keys(payments).map((type) => ({
        type,
        value: payments[type],
      }));
      const orderId = await createOrder(
        selected,
        paymentArgs,
        OrderStatus.PAID
      );
      router.push(`/order/${orderId}`);
    }
  };

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
            <PaymentInput
              type={PaymentTypes.MOMO}
              value={String(payments[PaymentTypes.MOMO] || "")}
              checked={payments[PaymentTypes.MOMO] !== undefined}
              onChangeType={(status) =>
                handleChangePaymentType(PaymentTypes.MOMO, status)
              }
              onChangeValue={(value) =>
                handleChangePaymentValue(PaymentTypes.MOMO, value)
              }
            />
            <PaymentInput
              type={PaymentTypes.CASH}
              value={String(payments[PaymentTypes.CASH] || "")}
              checked={payments[PaymentTypes.CASH] !== undefined}
              onChangeType={(status) =>
                handleChangePaymentType(PaymentTypes.CASH, status)
              }
              onChangeValue={(value) =>
                handleChangePaymentValue(PaymentTypes.CASH, value)
              }
            />
            <PaymentInput
              type={PaymentTypes.BANK_TRANSFER}
              value={String(payments[PaymentTypes.BANK_TRANSFER] || "")}
              checked={payments[PaymentTypes.BANK_TRANSFER] !== undefined}
              onChangeType={(status) =>
                handleChangePaymentType(PaymentTypes.BANK_TRANSFER, status)
              }
              onChangeValue={(value) =>
                handleChangePaymentValue(PaymentTypes.BANK_TRANSFER, value)
              }
            />
            <PaymentInput
              type={PaymentTypes.VOUCHER}
              value={String(payments[PaymentTypes.VOUCHER] || "")}
              checked={payments[PaymentTypes.VOUCHER] !== undefined}
              onChangeType={(status) =>
                handleChangePaymentType(PaymentTypes.VOUCHER, status)
              }
              onChangeValue={(value) =>
                handleChangePaymentValue(PaymentTypes.VOUCHER, value)
              }
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white drop-shadow-2xl">
        <button
          className="w-full bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-red-500 disabled:opacity-75 rounded-md text-center"
          onClick={handleSubmit}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
