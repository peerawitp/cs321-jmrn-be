-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'MARKETING', 'STORE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'PREPARING', 'SHIPPED', 'SUCCESS');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';
