import { PaymentTypes } from "@prisma/client";
import Image from "next/image";

import MomoIcon from "../../assets/images/icon-payment-momo.svg";
import CashIcon from "../../assets/images/icon-payment-cash.svg";
import BankIcon from "../../assets/images/icon-payment-bank.svg";
import VoucherIcon from "../../assets/images/icon-payment-voucher.svg";

interface Props {
  type: PaymentTypes;
  checked: boolean;
  value: string;
  onChangeType: (checked: boolean) => void;
  onChangeValue: (value: number) => void;
}

export default function PaymentInput({
  type,
  checked,
  value,
  onChangeType,
  onChangeValue,
}: Props) {
  return (
    <div className="flex mt-2">
      <label className="flex">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 mt-3 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => onChangeType(e.currentTarget.checked)}
          checked={checked}
        />
      </label>
      <div className="ml-4 w-3/4 flex flex-col items-start">
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

        <div className="flex flex-col mt-1 w-full">
          {type === PaymentTypes.VOUCHER && (
            <input
              type="text"
              className="form-input bloc w-full rounded-md mb-4 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Nhập mã Voucher"
            />
          )}
          <input
            type="number"
            value={value}
            className="form-input bloc w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Nhập số tiền. Ví dụ: 10000"
            onChange={(e) => onChangeValue(Number(e.target.value))}
            disabled={!checked}
          />
        </div>
      </div>
    </div>
  );
}
