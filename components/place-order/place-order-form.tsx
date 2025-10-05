"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Check, Loader } from "lucide-react";
import { createOrder } from "@/actions/order.actions";

export default function PlaceOrderForm() {
  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Check className=" h-4 w-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await createOrder();
    console.log("res", res);
    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
}
