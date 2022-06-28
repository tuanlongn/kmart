import { User } from "next-auth";
import React, { useContext } from "react";
import { useEffect, useState } from "react";

type Auth = {
  token: string;
  me: User;
};

type Props = {
  children: JSX.Element;
};

export const AuthContext = React.createContext<Auth | null>(null);

export default function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    async function getMyInfo() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/me`);
      const data = await res.json();
      setAuth(data);
    }
    getMyInfo();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
