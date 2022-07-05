import { PaymentTypes } from "@prisma/client";
import Image from "next/image";

import MomoIcon from "../../assets/images/icon-payment-momo.svg";
import CashIcon from "../../assets/images/icon-payment-cash.svg";
import BankIcon from "../../assets/images/icon-payment-bank.svg";
import VoucherIcon from "../../assets/images/icon-payment-voucher.svg";

interface Props {
  type: PaymentTypes;
}

export default function PaymentInput({ type }: Props) {
  return (
    <div className="flex mt-6">
      <label className="flex flex-1">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 mt-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div className="ml-4 mr-8 grow flex flex-col items-start">
          <div className="flex items-center">
            {type === PaymentTypes.MOMO && (
              <>
                <Image src={MomoIcon} alt={type} width={40} height={40} />
                <span className="ml-2">Thanh toán bằng ví MoMo</span>
              </>
            )}
            {type === PaymentTypes.BANK_TRANSFER && (
              <>
                <Image src={BankIcon} alt={type} width={40} height={40} />
                <span className="ml-2">Thanh toán chuyển khoản</span>
              </>
            )}
            {type === PaymentTypes.CASH && (
              <>
                <Image src={CashIcon} alt={type} width={40} height={40} />
                <span className="ml-2">Tiền mặt</span>
              </>
            )}
            {type === PaymentTypes.VOUCHER && (
              <>
                <Image src={VoucherIcon} alt={type} width={40} height={40} />
                <span className="ml-2">Sử dụng Voucher</span>
              </>
            )}
          </div>

          <div className="flex mt-2 w-full">
            <input
              type="number"
              className="form-input bloc w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </label>
    </div>
  );
}
