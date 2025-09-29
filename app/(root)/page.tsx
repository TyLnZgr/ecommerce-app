import ProductList from "@/components/product/product-list";
import DUMMY_DATA from "@/db/dummy-data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <ProductList data={DUMMY_DATA.products} title="Deneme" limit={4} />
    </>
  );
}
