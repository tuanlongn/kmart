import { PaymentTypes } from "@prisma/client";
import Image from "next/image";

import MomoIcon from "../../assets/images/icon-payment-momo.svg";
import CashIcon from "../../assets/images/icon-payment-cash.svg";
import BankIcon from "../../assets/images/icon-payment-bank.svg";
import VoucherIcon from "../../assets/images/icon-payment-voucher.svg";

type Props = {
  type: string;
};

export default function PaymentIcon({ type }: Props) {
  return (
    <div className="flex items-center">
      {type === PaymentTypes.MOMO && (
        <Image src={MomoIcon} alt={type} width={40} height={40} />
      )}
      {type === PaymentTypes.BANK_TRANSFER && (
        <Image src={BankIcon} alt={type} width={40} height={40} />
      )}
      {type === PaymentTypes.CASH && (
        <Image src={CashIcon} alt={type} width={40} height={40} />
      )}
      {type === PaymentTypes.VOUCHER && (
        <Image src={VoucherIcon} alt={type} width={40} height={40} />
      )}
    </div>
  );
}
