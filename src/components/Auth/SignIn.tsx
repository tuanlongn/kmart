import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-5 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={() => signIn("azure-ad")}
      >
        Đăng nhập với tài khoản Microsoft
      </button>
    </div>
  );
}
