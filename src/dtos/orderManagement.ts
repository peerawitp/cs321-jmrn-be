import { OrderStatus } from "@prisma/client";
import { t, Static } from "elysia";
import { AddAddressResponseDTO, GetOrderItemResponseDTO } from "./User";
export const GetAllOrderResponseDTO = t.Array(
  t.Object({
    id: t.Number(),
    userId: t.String(),
    addressId: t.Number(),
    status: t.String({ enum: OrderStatus }),
    totalAmount: t.Number(),
    orderItems: t.Array(GetOrderItemResponseDTO),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    customerAddress: AddAddressResponseDTO,
  }),
);
