-- CreateEnum
CREATE TYPE "TireType" AS ENUM ('SCOOTER', 'ONROAD_AUTOMATIC', 'ONROAD_SPORT', 'RACING', 'ON_OFF_ROAD', 'OFF_ROAD', 'CLASSIC');

-- CreateEnum
CREATE TYPE "WheelType" AS ENUM ('FRONT', 'REAR', 'BOTH');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "tireSize" TEXT NOT NULL,
    "patternAndType" TEXT NOT NULL,
    "overallDiameter" DOUBLE PRECISION NOT NULL,
    "overallWidth" DOUBLE PRECISION NOT NULL,
    "measurementRim" TEXT NOT NULL,
    "standardRim" TEXT NOT NULL,
    "wheel" "WheelType" NOT NULL,
    "type" "TireType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
