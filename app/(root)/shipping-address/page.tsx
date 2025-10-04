import React from "react";
import { getMyCart } from "@/actions/cart.actions";
import { getUserById } from "@/actions/user.actions";
import { auth } from "@/auth";
import ShippingAddressForm from "@/components/shipping-address-form.tsx/ShippingAddressForm";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckOutSteps from "@/components/shared/checkout-steps/CheckOutSteps";
export const metadata: Metadata = {
  title: "Shipping Address",
};
export default async function ShippingAddressPage() {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not authenticated");
  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
}
