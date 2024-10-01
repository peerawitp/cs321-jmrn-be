import { Elysia } from "elysia";

import userService from "../services/userService";

import {
  AddAddressDTO,
  AddAddressResponseDTO,
  GetUserInfoResponseDTO,
} from "../dtos/User";
import { isCustomer } from "../middlewares/isCustomer";

export const user = async (app: Elysia) =>
  app.group("/user", (app) =>
    app
      .use(isCustomer)
      .post(
        "/add-address",
        async ({ user, body }) => {
          const address = await userService.addNewAddress(user.id, body);
          return address;
        },
        {
          body: AddAddressDTO,
          response: AddAddressResponseDTO,
        },
      )
      .get(
        "/get-info",
        async ({ user }) => {
          const userInfo = await userService.findUserFromID(user.id);
          const addresses = await userService.findAddressFromUserID(user.id);

          if (!userInfo) {
            throw new Error("USER_NOT_FOUND");
          }

          return {
            id: userInfo.id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            role: userInfo.role,
            phone: userInfo.phone,
            addresses: addresses,
          };
        },
        {
          response: GetUserInfoResponseDTO,
        },
      ),
  );

export default user;
