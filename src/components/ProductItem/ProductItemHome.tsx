import React from "react";
import Image from "next/image";
import { Plus as PlusIcon } from "react-feather";

interface Props {
  name: string;
  price: number;
  labelPrice?: number | null;
  image: string;
  onAddCart: () => void;
}

export default function ProductItemHome({
  name,
  price,
  image,
  labelPrice,
  onAddCart,
}: Props) {
  return (
    <div className="p-1.5">
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="rounded-md"
        />
        <div
          className="rounded-full hover:bg-green-200 text-white bg-green-100 shadow-sm absolute bottom-5 right-3.5 p-1"
          onClick={onAddCart}
        >
          <PlusIcon color="#11999E" size={20} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold flex">
          {new Intl.NumberFormat("vi-VN").format(price)}
          <div className="text-xs mt-0 ml-0.5">đ</div>
        </div>
        <div className="text-xs line-through flex">
          {labelPrice && new Intl.NumberFormat("vi-VN").format(labelPrice)}
          <div className="text-xs -mt-1 ml-0">đ</div>
        </div>
      </div>
      <div className="text-sm text-gray-500">{name}</div>
    </div>
  );
}
