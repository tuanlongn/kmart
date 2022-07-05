import { useRouter } from "next/router";
import Cart from "../../components/Cart";

export default function CartPage() {
  const router = useRouter();

  return <Cart isPage={true} />;
}
