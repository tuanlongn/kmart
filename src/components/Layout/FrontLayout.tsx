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
  const { cartData } = useCart();
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
        <CartIcon strokeWidth={1} color="#2f363d" size={28} />
        {cartData.length > 0 && (
          <div className="rounded-full bg-red-500 absolute top-2 right-2 w-3 h-3 border-2 border-white"></div>
        )}
      </div>

      <Modal isOpen={isCartModalOpen} onClose={() => toogleCartModal()}>
        <Cart />
      </Modal>
    </div>
  );
}
