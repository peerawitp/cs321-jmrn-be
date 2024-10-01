import { UserRole } from "@prisma/client";
import { Static, t } from "elysia";

export const AddAddressDTO = t.Object({
  houseNumber: t.String(),
  village: t.String(),
  alley: t.String(),
  street: t.String(),
  subDistrict: t.String(),
  district: t.String(),
  province: t.String(),
  postalCode: t.String(),
  country: t.String(),
});

export type AddAddressDTOType = Static<typeof AddAddressDTO>;

export const AddAddressResponseDTO = t.Object({
  id: t.Number(),
  userId: t.String(),
  houseNumber: t.String(),
  village: t.Nullable(t.String()),
  alley: t.Nullable(t.String()),
  street: t.String(),
  subDistrict: t.String(),
  district: t.String(),
  province: t.String(),
  postalCode: t.String(),
  country: t.String(),
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
  addresses: t.Array(
    t.Object({
      id: t.Number(),
      userId: t.String(),
      houseNumber: t.String(),
      village: t.Nullable(t.String()),
      alley: t.Nullable(t.String()),
      street: t.String(),
      subDistrict: t.String(),
      district: t.String(),
      province: t.String(),
      postalCode: t.String(),
      country: t.String(),
    }),
  ),
});
