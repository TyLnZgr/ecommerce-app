import React from "react";
import { auth } from "@/auth";
import { Metadata } from "next";
import { getUserById } from "@/actions/user.actions";
import PaymentMethodForm from "@/components/payment-method/PaymentMethodForm";
import CheckOutSteps from "@/components/shared/checkout-steps/CheckOutSteps";
export const metadata: Metadata = {
  title: "Select Payment Method",
};
export default async function PaymentMethodPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not authenticated");
  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />;
    </>
  );
}
