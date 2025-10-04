"use client";
import React, { useTransition } from "react";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import { addItemToCart, removeItemFromCart } from "@/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
export default function CartTable(cart: { cart?: Cart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  /*  toast(res.message, {
        className: "bg-primary text-white hover:bg-gray-800",
        position: "top-right",
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      }); */
  console.log("cart", cart);
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.cart?.items.length === 0 ? (
        <div>
          Cart is empty.
          <Link href="/" className="underline ml-5">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.cart?.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="items-center flex"
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
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );
                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-3 h-3" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-3 h-3 animate-spin" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.cart?.items.reduce((a, c) => a + c.quantity, 0)}
                ):
                <span className="font-bold">
                  {formatCurrency(cart.cart?.itemsPrice || 0)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() => {
                  startTransition(() => router.push("/shipping-address"));
                }}
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
