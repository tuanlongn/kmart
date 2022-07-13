import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import SignIn from "./Auth/SignIn";
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
        <SignIn />
      </Modal>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
