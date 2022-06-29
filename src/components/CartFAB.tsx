import React, { useState } from "react";
import {
  ShoppingBag as CartIcon,
  Maximize as DetailIcon,
  ChevronRight as CollapseIcon,
} from "react-feather";
import useCart from "../common/hooks/useCart";
import { useAuth } from "./AuthProvider";

type Props = {
  openDetail: () => void;
};

export default function CartFAB({ openDetail }: Props) {
  const auth = useAuth();
  const { cartData, totalPrice, totalQuantity, loading } = useCart();
  const [cartIconTransform, setCartIconTransform] = useState(false);

  return (
    <div
      className={`transition-all fixed z-10 rounded-md bg-white drop-shadow ${
        cartIconTransform
          ? "bottom-3 right-3 left-3 p-2"
          : "bottom-6 right-5 p-3"
      }`}
      onClick={() =>
        auth?.data?.me && !cartIconTransform ? setCartIconTransform(true) : null
      }
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
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
                  <CollapseIcon strokeWidth={1} color="#2f363d" size={22} />
                </div>

                <div className="ml-6">
                  <div>{totalQuantity} sản phẩm:</div>
                  <div className="flex font-semibold text-xl">
                    {new Intl.NumberFormat("vi-VN").format(totalPrice)}
                    <div className="text-xs mt-0 ml-0.5">đ</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className="rounded-md bg-white mr-8"
                  onClick={() => openDetail()}
                >
                  <DetailIcon strokeWidth={1.5} color="#2f363d" size={28} />
                </div>

                <button className="bg-red-500 hover:bg-red-400 text-white uppercase font-bold py-3 px-4 border-b-4 border-red-700 hover:border-red-500 rounded-md text-center">
                  Thanh toán
                </button>
              </div>
            </div>
          ) : (
            <>
              <CartIcon strokeWidth={1} color="#2f363d" size={32} />
              {cartData.length > 0 && (
                <div className="rounded-full bg-red-500 absolute top-2 right-2 w-4 h-4 border-2 border-white"></div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
