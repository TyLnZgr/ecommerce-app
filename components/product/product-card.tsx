import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./product-price";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            priority
          />
        </Link>
      </CardHeader>
      <Link href={`/product/${product.slug}`}>
        <CardContent className="p-4 grid gap-4">
          <div className="text-xs">{product.brand}</div>

          <h2 className="text-sm font-medium">{product.name}</h2>

          <div className="flex-between gap-4">
            <p>{product.rating} Stars</p>
            {product.stock > 0 ? (
              <ProductPrice value={Number(product.price)} />
            ) : (
              <p className="text-destructive">Out of Stock</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
