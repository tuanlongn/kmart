import { useRouter } from "next/router";
import SignIn from "../../components/Auth/SignIn";

export default function CartPage() {
  const router = useRouter();

  return <SignIn />;
}
