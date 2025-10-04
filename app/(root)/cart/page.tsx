import { getMyCart } from "@/actions/cart.actions";
import CartTable from "@/components/cart/cart-table";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Shopping Cart",
};
export default async function CartPage() {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
}
