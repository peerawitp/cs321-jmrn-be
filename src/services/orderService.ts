import { db } from "../db";

const checkProductSizeQuantity = async (
  productSizeId: number,
  quantity: number,
) => {
  const productSize = await db.productSize.findUnique({
    where: { id: productSizeId },
  });
  if (!productSize) {
    throw new Error("Product size not found");
  }
  if (productSize.quantity < quantity) {
    throw new Error("Not enough quantity");
  }

  return productSize;
};

const decreaseProductSizeQuantity = async (
  productSizeId: number,
  quantity: number,
) => {
  const productSize = await checkProductSizeQuantity(productSizeId, quantity);

  const updatedProduct = await db.productSize.update({
    where: { id: productSizeId },
    data: { quantity: productSize.quantity - quantity },
  });
  return updatedProduct;
};

export default {
  decreaseProductSizeQuantity,
};
