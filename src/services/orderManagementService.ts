import { OrderStatus } from "@prisma/client";
import { db } from "../db";

const getAllOrder = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: true,
      customerAddress: true,
    },
  });
  return orders;
};

const updateOrderStatus = async (orderId: number, status: string) => {
  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status as OrderStatus,
    },
  });
  return order;
};

export default {
  getAllOrder,
  updateOrderStatus,
};
