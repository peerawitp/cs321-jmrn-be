/*
  Warnings:

  - Made the column `product_id` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_size_id` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_size_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "product_id" SET NOT NULL,
ALTER COLUMN "product_size_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_size_id_fkey" FOREIGN KEY ("product_size_id") REFERENCES "ProductSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
