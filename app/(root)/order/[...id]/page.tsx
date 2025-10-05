import { getOrderById } from "@/actions/order.actions";
import OrderDetailsTable from "@/components/order-details-table";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;
  const idArray = params.id;
  const orderId = Array.isArray(idArray) ? idArray[0] : idArray;
  const order = await getOrderById(orderId);
  if (!order) notFound();
  return (
    <OrderDetailsTable
      order={{
        ...order,
        orderItem: order.orderItem,
        shippingAddress: order.shippingAddress as ShippingAddress,
        paidAt: null,
      }}
    />
  );
};

export default OrderDetailsPage;
