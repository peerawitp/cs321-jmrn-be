import { OrderStatus } from "@prisma/client";
import { t, Static } from "elysia";
import { AddAddressResponseDTO, GetOrderItemResponseDTO } from "./User";

export const OrderDTO = t.Object({
  id: t.Number(),
  userId: t.String(),
  addressId: t.Number(),
  status: t.String({ enum: OrderStatus }),
  totalAmount: t.Number(),
  slipImageUrl: t.Nullable(t.String()),
  paymentVerifiedByUserID: t.Nullable(t.String()),
  orderItems: t.Array(GetOrderItemResponseDTO),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  customerAddress: AddAddressResponseDTO,
});

export const MarketingOrderDTO = t.Object({
  id: t.Number(),
  userId: t.String(),
  addressId: t.Number(),
  status: t.String({ enum: OrderStatus }),
  totalAmount: t.Number(),
  slipImageUrl: t.Nullable(t.String()),
  paymentVerifiedByUserID: t.Nullable(t.String()),
  orderItems: t.Array(GetOrderItemResponseDTO),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  customerAddress: AddAddressResponseDTO,
  user: t.Object({
    id: t.String(),
    phone: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    email: t.String(),
  }),
});

export const GetAllOrderResponseDTO = t.Array(MarketingOrderDTO);

export const UpdateOrderStatusDTO = t.Object({
  orderId: t.Number(),
  status: t.String({ enum: OrderStatus }),
});

export const UpdateOrderStatusResponseDTO = MarketingOrderDTO;

export const VerifySlipDTO = t.Object({
  orderId: t.Number(),
  status: t.Boolean(),
});

export const VerifySlipResponseDTO = OrderDTO;
