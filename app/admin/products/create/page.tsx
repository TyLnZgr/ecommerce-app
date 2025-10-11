import ProductForm from "@/components/admin/product-form";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Create Product",
};
export default function ProductCreatePage() {
  return (
    <>
      <h2 className="h2-bold"></h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
}
