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
import { Prisma } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";
type SalesDataType = {
  month: string;
  totalSales: number;
}[];
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

export async function getOrderSummary() {
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();
  const totalSales = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;
  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales),
  }));
  const latestSales = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: { select: { name: true } },
    },
    take: 6,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestSales,
    salesData,
  };
}
export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    skip: (page - 1) * limit,
    include: { user: { select: { name: true } } },
  });
  const dataCount = await prisma.order.count();
  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath("/admin/orders");
    return {
      success: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
export async function updateOrderToPaid(orderId: string) {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    // Siparişin varlığını ve kullanıcıya ait olup olmadığını kontrol et
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user?.id,
      },
    });

    if (!order) throw new Error("Order not found");

    if (order.isPaid) {
      return {
        success: false,
        message: "Order is already paid",
      };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        isDelivered: false,
      },
    });

    revalidatePath(`/order/${orderId}`);

    return {
      success: true,
      message: "Payment successful",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function updateOrderToPaidAdmin(orderId: string) {
  try {
    await updateOrderToPaid(orderId);
    revalidatePath(`/order/${orderId}`);
    return {
      success: true,
      message: "Order marked as paid",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
export async function deliverOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });
    if (!order) throw new Error("Order not found");
    if (!order.isPaid) throw new Error("Order is not paid");
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });
    revalidatePath(`/order/${orderId}`);
    return {
      success: true,
      message: "Order has been marked delivered",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
