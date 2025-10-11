"use client";
import { Order } from "@/types";
import React, { useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { deliverOrder, updateOrderToPaid } from "@/actions/order.actions";

export default function OrderDetailsTable({
  order,
  isAdmin,
}: {
  order: Order;
  isAdmin: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    id,
    shippingAddress,
    orderItem,
    shippingPrice,
    taxPrice,
    totalPrice,
    itemsPrice,
    paymentMethod,
    isPaid,
    paidAt,
    deliveredAt,
    isDelivered,
  } = order;
  const handlePayment = () => {
    startTransition(async () => {
      const result = await updateOrderToPaid(id || "");

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
  const MarkAsDeliveredButton = () => {
    return (
      <Button
        type="button"
        className="w-full"
        onClick={async () => {
          const res = await deliverOrder(order.id || "");
          if (!res.success) toast.error(res.message);
          toast.success(res.message);
        }}
      >
        Delivered
      </Button>
    );
  };
  return (
    <>
      <h1 className="py-4 text-2xl">Order {id}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItem.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Text</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {!isPaid && (
                <Button
                  onClick={handlePayment}
                  disabled={isPending}
                  className="w-full"
                  variant="default"
                >
                  {isPending ? "Processing..." : "Pay Now"}
                </Button>
              )}
              {isPaid && (
                <Badge
                  variant="secondary"
                  className="w-full justify-center py-2"
                >
                  Payment Completed
                </Badge>
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
