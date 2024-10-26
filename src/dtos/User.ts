import { OrderStatus, UserRole } from "@prisma/client";
import { Static, t } from "elysia";

export const AddAddressDTO = t.Object({
  houseNumber: t.String({
    minLength: 1,
  }),
  village: t.Nullable(t.String()),
  alley: t.Nullable(t.String()),
  street: t.Nullable(t.String()),
  subDistrict: t.String({
    minLength: 1,
  }),
  district: t.String({
    minLength: 1,
  }),
  province: t.String({
    minLength: 1,
  }),
  postalCode: t.String({
    minLength: 5,
  }),
  country: t.String({
    minLength: 2,
  }),
});

export type AddAddressDTOType = Static<typeof AddAddressDTO>;

export const AddAddressResponseDTO = t.Object({
  id: t.Number(),
  houseNumber: t.String({
    minLength: 1,
  }),
  village: t.Nullable(t.String()),
  alley: t.Nullable(t.String()),
  street: t.Nullable(t.String()),
  subDistrict: t.String({
    minLength: 1,
  }),
  district: t.String({
    minLength: 1,
  }),
  province: t.String({
    minLength: 1,
  }),
  postalCode: t.String({
    minLength: 5,
  }),
  country: t.String({
    minLength: 2,
  }),
});

export const GetUserInfoResponseDTO = t.Object({
  id: t.String(),
  email: t.String({
    format: "email",
  }),
  firstName: t.String(),
  lastName: t.String(),
  role: t.String({ enum: UserRole }),
  phone: t.String(),
  addresses: t.Array(AddAddressResponseDTO),
});

export const GetOrderItemResponseDTO = t.Object({
  id: t.Number(),
  orderId: t.Number(),
  productId: t.Number(),
  productSizeId: t.Number(),
  quantity: t.Number(),
  price: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const GetUserOrderResponseDTO = t.Array(
  t.Object({
    id: t.Number(),
    userId: t.String(),
    addressId: t.Number(),
    status: t.String({ enum: OrderStatus }),
    totalAmount: t.Number(),
    orderItems: t.Array(GetOrderItemResponseDTO),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
);

export const CreateUserOrderDTO = t.Object({
  addressId: t.Number(),
  orderItems: t.Array(
    t.Object({
      productId: t.Number(),
      productSizeId: t.Number(),
      quantity: t.Number(),
    }),
  ),
});

export type CreateUserOrderDTOType = Static<typeof CreateUserOrderDTO>;

export const CreateUserOrderResponseDTO = t.Object({
  id: t.Number(),
  userId: t.String(),
  addressId: t.Number(),
  status: t.String({ enum: OrderStatus }),
  totalAmount: t.Number(),
  orderItems: t.Array(GetOrderItemResponseDTO),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const ConfirmReceiveDTO = t.Object({
  orderId: t.Number(),
});

export const ConfirmReceiveResponseDTO = CreateUserOrderDTO;

export const CancelOrderDTO = t.Object({
  orderId: t.Number(),
});

export const CancelOrderResponseDTO = CreateUserOrderDTO;
