import { Elysia } from "elysia";

import userService from "../services/userService";

import { AddAddressDTO, AddAddressResponseDTO } from "../dtos/User";
import { isCustomer } from "../middlewares/isCustomer";

export const user = async (app: Elysia) =>
  app.group("/user", (app) =>
    app.use(isCustomer).post(
      "/add-address",
      async ({ user, body }) => {
        const address = await userService.addNewAddress(user.id, body);
        return address;
      },
      {
        body: AddAddressDTO,
        response: AddAddressResponseDTO,
      },
    ),
  );

export default user;
