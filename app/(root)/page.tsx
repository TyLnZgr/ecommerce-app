import React from "react";
import ProductList from "@/components/product/product-list";
import { Metadata } from "next";
import { getLatestProducts } from "@/actions/product.actions";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const products = await getLatestProducts();
  return (
    <>
      <ProductList data={products} title="Products" />
    </>
  );
}
