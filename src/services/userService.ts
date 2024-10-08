import { RegisterDTOType } from "../dtos/Auth";

import { AddAddressDTOType, CreateUserOrderDTOType } from "../dtos/User";

import { db } from "../db";
import orderService from "./orderService";

const findUserFromID = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const findUserFromEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const findUserFromPhone = async (phone: string) => {
  const user = await db.user.findUnique({
    where: {
      phone,
    },
  });
  return user;
};

const findAddressFromUserID = async (id: string) => {
  const address = await db.address.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      userId: true,
      houseNumber: true,
      village: true,
      alley: true,
      street: true,
      subDistrict: true,
      district: true,
      province: true,
      postalCode: true,
      country: true,
    },
  });

  return address;
};

const createUser = async (user: RegisterDTOType) => {
  if (await findUserFromEmail(user.email))
    throw new Error("EMAIL_ALREADY_EXIST");
  if (await findUserFromPhone(user.phone))
    throw new Error("PHONE_ALREADY_EXIST");

  const hashedPassword = await Bun.password.hash(user.password);

  const newUser = await db.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  return newUser;
};

const addNewAddress = async (userId: string, address: AddAddressDTOType) => {
  const newAddress = await db.address.create({
    data: {
      userId: userId,
      houseNumber: address.houseNumber,
      village: address.village || "",
      alley: address.alley || "",
      street: address.street,
      subDistrict: address.subDistrict,
      district: address.district,
      province: address.province,
      postalCode: address.postalCode,
      country: address.country,
    },
  });
  return newAddress;
};

const findOrderFromUserID = async (userId: string) => {
  const orders = await db.order.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      userId: true,
      addressId: true,
      status: true,
      totalAmount: true,
      orderItems: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return orders;
};

const createOrder = async (
  userId: string,
  createOrder: CreateUserOrderDTOType,
) => {
  return await db.$transaction(async (tx) => {
    const productSizes = await tx.productSize.findMany({
      where: {
        id: {
          in: createOrder.orderItems.map((item) => item.productSizeId),
        },
      },
    });

    // calculate total amount
    const totalAmount = productSizes.reduce((acc, curr) => {
      const item = createOrder.orderItems.find(
        (item) => item.productSizeId === curr.id,
      );
      if (!item) return acc;
      return acc + item.quantity * curr.price;
    }, 0);

    // decrease quantity using the transaction
    for (const item of createOrder.orderItems) {
      await orderService.decreaseProductSizeQuantity(
        tx,
        item.productSizeId,
        item.quantity,
      );
    }

    // Create the new order with the transaction
    const newOrder = await tx.order.create({
      data: {
        userId,
        addressId: createOrder.addressId,
        status: "WAITING_PAYMENT",
        totalAmount: totalAmount,
        orderItems: {
          create: createOrder.orderItems.map((item) => ({
            productId: item.productId,
            productSizeId: item.productSizeId,
            quantity: item.quantity,
            price:
              productSizes.find((size) => size.id === item.productSizeId)
                ?.price || 0,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return newOrder;
  });
};

export default {
  findUserFromID,
  findUserFromEmail,
  findUserFromPhone,
  findAddressFromUserID,
  createUser,
  addNewAddress,
  findOrderFromUserID,
  createOrder,
};
