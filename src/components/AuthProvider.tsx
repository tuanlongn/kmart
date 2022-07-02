import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import useModal from "./Modal/useModal";

type AuthData = {
  token: string;
  me: User;
};

type AuthContext = {
  data: AuthData | null;
  toogleLoginModal: () => void;
  logout: () => void;
};

type Props = {
  children: JSX.Element;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: Props) {
  const [data, setData] = useState<AuthData | null>(null);

  const [isLoginModalOpen, toogleLoginModal] = useModal(false);

  useEffect(() => {
    async function getMyInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/me`);
      const data = await res.json();
      setData(data);
    }
    getMyInfo();
  }, []);

  const logout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  return (
    <AuthContext.Provider value={{ data, toogleLoginModal, logout }}>
      {children}

      <Modal isOpen={isLoginModalOpen} onClose={() => toogleLoginModal()}>
        <div className="flex items-center justify-center h-screen">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-5 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={() => signIn("azure-ad")}
          >
            Đăng nhập với tài khoản Microsoft
          </button>
        </div>
      </Modal>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
