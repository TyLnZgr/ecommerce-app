/*
  Warnings:

  - You are about to drop the column `İsDelivered` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "İsDelivered",
ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false;
