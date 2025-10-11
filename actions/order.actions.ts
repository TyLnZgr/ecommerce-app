"use server";

import { auth } from "@/auth";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getMyCart } from "./cart.actions";
import { getUserById } from "./user.actions";
import { insertOrderSchema } from "@/lib/validator";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { PAGE_SIZE } from "@/lib/constants";
export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const cart = await getMyCart();
    const userId = session.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }
    if (!user.address) {
      return {
        success: false,
        message: "No shipping address found",
        redirectTo: "/shipping-address",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method found",
        redirectTo: "/payment-method",
      };
    }
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({ data: order });
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });
      return insertedOrder.id;
    });
    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}

export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderItem: true,
      user: { select: { name: true, email: true } },
    },
  });
  return convertToPlainObject(data);
}
export async function getMOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const session = await auth();
  if (!session) throw new Error("User is not authorized");

  const orderData = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });
  const dataCount = await prisma.order.count({
    where: { userId: session?.user?.id },
  });
  return {
    orderData,
    totalPages: Math.ceil(dataCount / limit),
  };
}
