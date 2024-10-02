import { UserRole } from "@prisma/client";
import { Static, t } from "elysia";

export const AddAddressDTO = t.Object({
  houseNumber: t.String({
    minLength: 1,
  }),
  village: t.Nullable(
    t.String({
      minLength: 1,
    }),
  ),
  alley: t.Nullable(
    t.String({
      minLength: 1,
    }),
  ),
  street: t.String({
    minLength: 1,
  }),
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
  houseNumber: t.String({
    minLength: 1,
  }),
  village: t.Nullable(
    t.String({
      minLength: 1,
    }),
  ),
  alley: t.Nullable(
    t.String({
      minLength: 1,
    }),
  ),
  street: t.String({
    minLength: 1,
  }),
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
