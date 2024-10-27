import { OrderStatus } from "@prisma/client";
import { db } from "../db";

const getAllOrder = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: true,
      customerAddress: true,
      user: true,
    },
  });
  return orders;
};

const updateOrderStatus = async (orderId: number, status: string) => {
  const order = await db.order.update({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
      customerAddress: true,
      user: true,
    },
    data: {
      status: status as OrderStatus,
    },
  });
  return order;
};

const verifySlip = async (
  orderId: number,
  status: boolean,
  verifiedByUserId: string,
) => {
  if (!status) {
    return await db.order.update({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
        customerAddress: true,
        user: true,
      },
      data: {
        status: OrderStatus.WAITING_PAYMENT,
        slipImageUrl: null,
      },
    });
  } else {
    return await db.order.update({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
        customerAddress: true,
        user: true,
      },
      data: {
        status: OrderStatus.PREPARING,
        paymentVerifiedByUserID: verifiedByUserId,
      },
    });
  }
};

export default {
  getAllOrder,
  updateOrderStatus,
  verifySlip,
};
