import React from "react";
import { Menu } from "@headlessui/react";
import {
  Layers as OrderIcon,
  MessageCircle as AdviceIcon,
  LogOut as LogoutIcon,
} from "react-feather";

import { useAuth } from "../AuthProvider";
import Cart from "../Cart";
import CartFAB from "../CartFAB";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";
import Logo from "../../assets/images/logo_kmart.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

export default function FrontLayout({ children }: Props) {
  const router = useRouter();
  const auth = useAuth();
  const [isCartModalOpen, toogleCartModal] = useModal(false);

  return (
    <div className="w-screen h-screen z-0">
      <nav className="sticky top-0 bg-white/90 p-2.5 mb-4 drop-shadow-xl z-10 flex justify-between">
        <Link className="flex items-center" href="/">
          <Image src={Logo} alt="K-Mart" width={89} height={40} />
        </Link>

        {auth?.data?.me && (
          <Menu as="div" className="flex">
            <Menu.Button className="">
              <div className="rounded-full w-10 h-10 bg-gray-100 border-2 border-gray-300"></div>
            </Menu.Button>

            <Menu.Items className="py-2 origin-top-right absolute right-0 mt-11 mr-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <a
                  className="flex items-center text-gray-700 px-4 py-2 text-sm"
                  onClick={() => router.push("/order/list")}
                >
                  <div className="mr-2">
                    <OrderIcon strokeWidth={1.5} size={18} color="#2f363d" />
                  </div>{" "}
                  Đơn hàng của bạn
                </a>
              </Menu.Item>
              <Menu.Item>
                <a className="flex items-center text-gray-700 px-4 py-2 text-sm">
                  <div className="mr-2">
                    <AdviceIcon strokeWidth={1.5} size={18} color="#2f363d" />
                  </div>{" "}
                  Góp ý
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  className="flex items-center text-gray-700 px-4 py-2 text-sm"
                  onClick={() => auth.logout()}
                >
                  <div className="mr-2">
                    <LogoutIcon strokeWidth={1.5} size={18} color="#2f363d" />
                  </div>{" "}
                  Đăng xuất
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        )}
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
