import { OrderStatus, PaymentTypes } from "@prisma/client";
import { format } from "small-date";

export function randomNumberBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function currency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function displayTime(strDate: string) {
  return format(new Date(strDate), "dd-MM-yyyy HH:mm", {
    locale: "vi-VN",
  });
}

export function orderNumber(orderId: string) {
  return orderId.substring(0, 6).toUpperCase();
}

export function orderStatusText(status: string) {
  switch (status) {
    case OrderStatus.PAID:
      return "Đã thanh toán";
    case OrderStatus.UNPAID:
      return "Chưa thanh toán";
    case OrderStatus.CANCELED:
      return "Đã huỷ";
    default:
      return "---";
  }
}

export function paymentText(paymentType: string) {
  switch (paymentType) {
    case PaymentTypes.MOMO:
      return "MoMo";
    case PaymentTypes.CASH:
      return "Tiền mặt";
    case PaymentTypes.BANK_TRANSFER:
      return "Bank";
    case PaymentTypes.VOUCHER:
      return "Voucher";
    default:
      return "---";
  }
}
