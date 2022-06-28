import React from "react";
import { ShoppingBag as CartIcon } from "react-feather";
import useCart from "../../common/hooks/useCart";
import { useAuth } from "../AuthProvider";
import Cart from "../Cart";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

type Props = {
  children: JSX.Element;
};

export default function WithAuthLayout({ children }: Props) {
  const auth = useAuth();
  const { cartData, loading } = useCart();
  console.log({ loading });
  const [isCartModalOpen, toogleCartModal] = useModal(false);

  return (
    <div className="w-screen h-screen z-0">
      <nav className="sticky top-0 bg-white/90 p-4 mb-4 drop-shadow shadow-blue-600 z-10 flex justify-between">
        <div className="text-lg font-bold">K-Mart</div>
      </nav>
      {children}

      <div
        className="fixed bottom-6 right-5 z-10 rounded-lg p-3 bg-white drop-shadow"
        onClick={() => toogleCartModal()}
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
            <CartIcon strokeWidth={1} color="#2f363d" size={28} />
            {cartData.length > 0 && (
              <div className="rounded-full bg-red-500 absolute top-2 right-2 w-3 h-3 border-2 border-white"></div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={isCartModalOpen} onClose={() => toogleCartModal()}>
        <Cart />
      </Modal>
    </div>
  );
}
