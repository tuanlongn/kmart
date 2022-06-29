import React from "react";
import { useTimeout } from "usehooks-ts";
import useCart from "../../common/hooks/useCart";
import { useAuth } from "../AuthProvider";
import Cart from "../Cart";
import CartFAB from "../CartFAB";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

type Props = {
  children: JSX.Element;
};

export default function FrontLayout({ children }: Props) {
  const auth = useAuth();
  const [isCartModalOpen, toogleCartModal] = useModal(false);

  return (
    <div className="w-screen h-screen z-0">
      <nav className="sticky top-0 bg-white/90 p-4 mb-4 drop-shadow shadow-blue-600 z-10 flex justify-between">
        <div className="text-lg font-bold">K-Mart</div>
      </nav>
      {children}

      <div
        onClick={(e) => {
          if (auth?.data?.me) {
            //
          } else {
            auth?.toogleLoginModal();
          }
        }}
      >
        <CartFAB openDetail={() => toogleCartModal()} />
      </div>

      <Modal isOpen={isCartModalOpen} onClose={() => toogleCartModal()}>
        <Cart />
      </Modal>
    </div>
  );
}
