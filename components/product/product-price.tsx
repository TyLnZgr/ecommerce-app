import React from "react";
import { cn } from "@/lib/utils";

export default function ProductPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const priceValue = value.toFixed(2);
  const [priceInt, priceFloat] = priceValue.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {priceInt}
      <span className="text-xs align-super">{priceFloat}</span>
    </p>
  );
}
