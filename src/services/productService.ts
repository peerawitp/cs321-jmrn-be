import { TireType } from "@prisma/client";
import { db } from "../db";

const findAllProducts = async () => {
  const products = await db.product.findMany({
    include: {
      productSizes: true,
    },
  });
  return products;
};

const findAllProductsByType = async (type: TireType) => {
  const products = await db.product.findMany({
    where: {
      type,
    },
    include: {
      productSizes: true,
    },
  });
  return products;
};

export default {
  findAllProducts,
  findAllProductsByType,
};
