import React from "react";
import Image from "next/image";
import {
  Minus as MinusIcon,
  Plus as PlusIcon,
  Trash2 as RemoveIcon,
} from "react-feather";

import useCart from "../common/hooks/useCart";
import { OrderStatus } from "@prisma/client";

type Props = {};

export default function Cart({}: Props) {
  const {
    cartData,
    totalPrice,
    totalQuantity,
    selected,
    selectedQuantity,
    handleSelectChange,
    updateCart,
    removeCart,
    createOrder,
  } = useCart();

  return (
    <div className="bg-white pt-5 flex flex-col h-screen">
      <div className="font-semibold text-lg mb-4 ml-3">Giỏ hàng</div>

      <div className="grow overflow-y-auto p-3">
        {cartData.length > 0
          ? cartData.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3 pb-3 border-b-[1px] border-dashed border-gray-200"
              >
                <div className="flex">
                  <div className="flex">
                    <div className="mr-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-blue-100 rounded border-blue-300 focus:ring-blue-500"
                        checked={selected.includes(item.id)}
                        onChange={() => handleSelectChange(item.id)}
                      />
                    </div>
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
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <div
                        className="rounded-full p-1 bg-gray-100"
                        onClick={() =>
                          updateCart({
                            variables: {
                              id: item.id,
                              quantity: item.quantity - 1,
                            },
                          })
                        }
                      >
                        <MinusIcon
                          strokeWidth={1.5}
                          size={18}
                          color="#2f363d"
                        />
                      </div>
                      <div className="ml-2 mr-2">
                        <input
                          type="text"
                          className="form-control block w-7 h-7 text-xs text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-center"
                          defaultValue={item.quantity}
                          onChange={(event) =>
                            updateCart({
                              variables: {
                                id: item.id,
                                quantity: Number(event.target.value),
                              },
                            })
                          }
                        />
                      </div>
                      <div
                        className="rounded-full p-1 bg-gray-100"
                        onClick={() =>
                          updateCart({
                            variables: {
                              id: item.id,
                              quantity: item.quantity + 1,
                            },
                          })
                        }
                      >
                        <PlusIcon strokeWidth={1.5} size={18} color="#2f363d" />
                      </div>
                    </div>
                    <div
                      className="ml-4 rounded-full p-1 bg-gray-100"
                      onClick={() =>
                        removeCart({
                          variables: {
                            id: item.id,
                          },
                        })
                      }
                    >
                      <RemoveIcon strokeWidth={1.5} size={18} color="#2f363d" />
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
        <div className="flex justify-between">
          <div className="">
            {selectedQuantity}/{totalQuantity} sp đang chọn
          </div>
          <div className="flex justify-end mb-3 font-semibold">
            Tổng tiền: {new Intl.NumberFormat("vi-VN").format(totalPrice)}
            <div className="text-xs mt-0 ml-0.5">đ</div>
          </div>
        </div>
        <button
          className="w-full bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-red-500 rounded-md text-center"
          onClick={() =>
            createOrder({
              variables: {
                cartItemIDs: selected,
                status: OrderStatus.PAID,
              },
            })
          }
          disabled={selected.length === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
