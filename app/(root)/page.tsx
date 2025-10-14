import React from "react";
import ProductList from "@/components/product/product-list";
import { Metadata } from "next";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/actions/product.actions";
import ProductCarousel from "@/components/product/product-carousel";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={products} title="Products" />
    </>
  );
}
