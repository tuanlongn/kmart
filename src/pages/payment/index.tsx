import { useRouter } from "next/router";
import PaymentForm from "../../components/Payment/PaymentForm";

export default function PaymentPage() {
  const router = useRouter();

  return <PaymentForm isPage={true} />;
}
