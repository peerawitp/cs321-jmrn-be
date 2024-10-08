import { TireType, WheelType } from "@prisma/client";
import { t } from "elysia";

export const ProductSizeDTO = t.Object({
  id: t.Number(),
  productId: t.Number(),
  name: t.String(),
  overallDiameter: t.Number(),
  overallWidth: t.Number(),
  measurementRim: t.String(),
  standardRim: t.String(),
  price: t.Number(),
  quantity: t.Number(),

  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const GetAllProductQueryDTO = t.Object({
  type: t.Optional(t.String({ enum: TireType })),
});

export const GetAllProductDTO = t.Array(
  t.Object({
    id: t.Number(),
    name: t.String(),
    description: t.Nullable(t.String()),
    imageUrl: t.Nullable(t.String()),
    patternAndType: t.String(),
    wheel: t.String({ enum: WheelType }),
    type: t.String({ enum: TireType }),

    productSizes: t.Array(ProductSizeDTO),

    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
);
