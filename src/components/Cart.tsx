import React from "react";
import Image from "next/image";
import { Minus as MinusIcon, Plus as PlusIcon } from "react-feather";
import useCart from "../common/hooks/useCart";

type Props = {};

export default function Cart({}: Props) {
  const { cartData, total } = useCart();

  return (
    <div className="bg-white pt-5 flex flex-col h-screen">
      <div className="font-semibold text-lg mb-4 ml-3">Giỏ hàng</div>

      <div className="grow overflow-y-auto p-3">
        {cartData.length > 0
          ? cartData.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <div className="flex w-1/2">
                  <div className="rounded-md bg-gray-100 w-14 h-14">
                    <Image
                      className="rounded-md"
                      src={item.productVariant.image.source}
                      alt={item.productVariant.product.name}
                      height={60}
                      width={60}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm">
                      {item.productVariant.product.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.productVariant.title}
                    </div>
                  </div>
                </div>
                <div className="flex w-1/2 justify-between">
                  <div className="flex items-start pl-2">
                    <div className="rounded-full p-1 bg-gray-100">
                      <MinusIcon strokeWidth={1.5} size={16} color="#2f363d" />
                    </div>
                    <div className="ml-2 mr-2">
                      <input
                        type="text"
                        className="form-control block w-6 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div className="rounded-full p-1 bg-gray-100">
                      <PlusIcon strokeWidth={1.5} size={16} color="#2f363d" />
                    </div>
                  </div>
                  <div className="flex ml-3 text-sm">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.productVariant.price
                    )}
                    <div className="text-xs mt-0 ml-0.5">đ</div>
                  </div>
                </div>
              </div>
            ))
          : "Bạn chưa chọn sản phẩm nào."}
      </div>

      <div className="bg-white p-3 drop-shadow-2xl">
        <div className="flex justify-end mb-3 font-semibold">
          Tổng tiền: {new Intl.NumberFormat("vi-VN").format(total)}
          <div className="text-xs mt-0 ml-0.5">đ</div>
        </div>
        <div className="bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-blue-500 rounded-md text-center">
          Thanh toán
        </div>
      </div>
    </div>
  );
}
