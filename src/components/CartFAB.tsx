import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  ShoppingBag as CartIcon,
  Maximize as DetailIcon,
  ChevronRight as CollapseIcon,
} from "react-feather";

import useCart from "../common/hooks/useCart";
import { currency } from "../common/utils";
import { useAuth } from "./AuthProvider";

type Props = {
  openDetail: () => void;
};

export default function CartFAB({ openDetail }: Props) {
  const router = useRouter();
  const auth = useAuth();
  const { cartData, totalPrice, totalQuantity, selectedQuantity, loading } =
    useCart();
  console.log({ selectedQuantity });

  const [cartIconTransform, setCartIconTransform] = useState(false);

  return (
    <div
      className={`transition duration-1000 fixed z-10 bg-white drop-shadow-2xl ${
        cartIconTransform
          ? "rounded-md p-2 bottom-3 right-3 left-3"
          : "rounded-full p-4 bottom-6 right-5"
      }`}
      onClick={() =>
        auth?.data?.me && !cartIconTransform ? setCartIconTransform(true) : null
      }
    >
      {loading ? (
        <svg
          className="animate-spin h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {cartIconTransform ? (
            <div className="flex justify-between items-center">
              <div className="flex">
                <div
                  className=" flex items-center rounded-md bg-gray-200 hover:bg-gray-300"
                  onClick={() => setCartIconTransform(false)}
                >
                  <CollapseIcon strokeWidth={1} color="#2f363d" size={24} />
                </div>

                <div className="ml-4">
                  <div>
                    {selectedQuantity}/{totalQuantity} sản phẩm:
                  </div>
                  <div className="flex font-semibold text-xl">
                    {currency(totalPrice)}
                    <div className="text-xs mt-0 ml-0.5">đ</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className="rounded-md bg-white mr-6"
                  onClick={() => openDetail()}
                >
                  <DetailIcon strokeWidth={1.5} color="#2f363d" size={28} />
                </div>

                <button
                  className="bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-red-500 disabled:opacity-75 rounded-md text-center"
                  onClick={() => router.push("/payment")}
                  disabled={!(selectedQuantity > 0)}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          ) : (
            <>
              <CartIcon strokeWidth={1} color="#2f363d" size={36} />
              {cartData.length > 0 && (
                <div className="rounded-full bg-red-500 absolute top-4 right-4 w-4 h-4 border-2 border-white"></div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
