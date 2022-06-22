import React from "react";
import Image from "next/image";

interface Props {
  name: string;
  price: number;
  labelPrice?: number | null;
  image: string;
}

export default function ProductItemHome({
  name,
  price,
  image,
  labelPrice,
}: Props) {
  return (
    <div className="group relative p-2">
      <div className="">
        <Image
          src={image}
          alt={name}
          width={180}
          height={100}
          className="rounded-md"
        />
      </div>
      <div>
        {price} <span>{labelPrice}</span>
      </div>
      <div>{name}</div>
    </div>
  );
}
