import React from "react";
import Image from "next/image";
import useCart from "../common/hooks/useCart";

type Props = {};

export default function Cart({}: Props) {
  const { cartData } = useCart();

  return (
    <div className="bg-white p-3 pt-5">
      <div className="font-semibold text-lg mb-4">Giỏ hàng</div>

      <div className="">
        {cartData.length > 0
          ? cartData.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex mb-3">
                  <Image
                    className="rounded-md"
                    src={item.productVariant.image.source}
                    alt={item.productVariant.product.name}
                    height={60}
                    width={60}
                  />
                  <div className="ml-3">
                    <div className="">{item.productVariant.product.name}</div>
                    <div className="text-sm">{item.productVariant.title}</div>
                  </div>
                </div>
                <div className="flex">
                  {new Intl.NumberFormat("vi-VN").format(
                    item.productVariant.price
                  )}
                  <div className="text-xs mt-0 ml-0.5">đ</div>
                </div>
              </div>
            ))
          : "Bạn chưa chọn sản phẩm nào."}
      </div>
    </div>
  );
}
