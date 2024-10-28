import { TireType, WheelType } from "@prisma/client";
import { t, Static } from "elysia";

export const AddProductDTO = t.Object({
  name: t.String(),
  description: t.Nullable(t.String()),
  image: t.File({
    type: ["image/png", "image/jpg", "image/jpeg"],
    maxSize: 1024 * 1024 * 5,
  }),
  patternAndType: t.String(),
  wheel: t.String({ enum: WheelType }),
  type: t.String({ enum: TireType }),
});

export type AddProductDTOType = Static<typeof AddProductDTO>;

export const AddProductResponseDTO = t.Object({
  id: t.Number(),
  name: t.String(),
  description: t.Nullable(t.String()),
  imageUrl: t.Nullable(t.String()),
  patternAndType: t.String(),
  wheel: t.String({ enum: WheelType }),
  type: t.String({ enum: TireType }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const AddProductSizeDTO = t.Object({
  productId: t.Number(),
  name: t.String(),
  overallDiameter: t.Number(),
  overallWidth: t.Number(),
  measurementRim: t.String(),
  standardRim: t.String(),
  price: t.Number(),
  quantity: t.Number(),
});

export type AddProductSizeDTOType = Static<typeof AddProductSizeDTO>;

export const AddProductSizeResponseDTO = t.Object({
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

export const EditProductDTO = t.Object({
  id: t.Number(),
  name: t.Optional(t.String()),
  description: t.Optional(t.Nullable(t.String())),
  image: t.Optional(
    t.File({
      type: ["image/png", "image/jpg", "image/jpeg"],
      maxSize: 1024 * 1024 * 5,
    }),
  ),
  patternAndType: t.Optional(t.String()),
  wheel: t.Optional(t.String({ enum: WheelType })),
  type: t.Optional(t.String({ enum: TireType })),
});

export type EditProductDTOType = Static<typeof EditProductDTO>;

export const EditProductResponseDTO = AddProductResponseDTO;

export const EditProductSizeDTO = t.Object({
  id: t.Number(),
  name: t.Optional(t.String()),
  overallDiameter: t.Optional(t.Number()),
  overallWidth: t.Optional(t.Number()),
  measurementRim: t.Optional(t.String()),
  standardRim: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  quantity: t.Optional(t.Number()),
});

export type EditProductSizeDTOType = Static<typeof EditProductSizeDTO>;

export const EditProductSizeResponseDTO = AddProductSizeResponseDTO;
