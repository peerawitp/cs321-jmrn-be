import { Static, t } from "elysia";

export const AddAddressDTO = t.Object({
  street: t.String(),
  city: t.String(),
  state: t.String(),
  postalCode: t.String(),
  country: t.String(),
});

export type AddAddressDTOType = Static<typeof AddAddressDTO>;

export const AddAddressResponseDTO = t.Object({
  id: t.Number(),
  userId: t.String(),
  street: t.String(),
  city: t.String(),
  state: t.String(),
  postalCode: t.String(),
  country: t.String(),
});
