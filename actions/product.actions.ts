"use server";

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";

//GET PRODUCTs

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
//Get single product

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
