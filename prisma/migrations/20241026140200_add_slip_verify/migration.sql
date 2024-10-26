-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'WAITING_PAYMENT_CONFIRMATION';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment_verified_by_user_id" TEXT,
ADD COLUMN     "slip_image_url" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_verified_by_user_id_fkey" FOREIGN KEY ("payment_verified_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
