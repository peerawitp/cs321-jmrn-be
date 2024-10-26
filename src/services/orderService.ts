const checkProductSizeQuantity = async (
  tx: any,
  productSizeId: number,
  quantity: number,
) => {
  const productSize = await tx.productSize.findUnique({
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
  tx: any,
  productSizeId: number,
  quantity: number,
) => {
  const productSize = await checkProductSizeQuantity(
    tx,
    productSizeId,
    quantity,
  );

  const updatedProduct = await tx.productSize.update({
    where: { id: productSizeId },
    data: { quantity: productSize.quantity - quantity },
  });
  return updatedProduct;
};

const bringBackProductSizeQuantity = async (
  tx: any,
  orderItems: { productSizeId: number; quantity: number }[],
) => {
  for (const item of orderItems) {
    const productSize = await tx.productSize.findUnique({
      where: { id: item.productSizeId },
    });
    await tx.productSize.update({
      where: { id: item.productSizeId },
      data: { quantity: productSize.quantity + item.quantity },
    });
  }

  return true;
};

export default {
  checkProductSizeQuantity,
  decreaseProductSizeQuantity,
  bringBackProductSizeQuantity,
};
