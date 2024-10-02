import { Elysia } from "elysia";

import userService from "../services/userService";

import { isCustomer } from "../middlewares/isCustomer";
import {
  CreateUserOrderDTO,
  CreateUserOrderResponseDTO,
  GetUserOrderResponseDTO,
} from "../dtos/User";

export const order = async (app: Elysia) =>
  app.group("/order", (app) =>
    app
      .use(isCustomer)
      .get(
        "/get-order",
        async ({ user }) => {
          const orders = await userService.findOrderFromUserID(user.id);
          return orders;
        },
        {
          response: GetUserOrderResponseDTO,
        },
      )
      .post(
        "/create-order",
        async ({ user, body }) => {
          const order = await userService.createOrder(user.id, body);
          return order;
        },
        {
          body: CreateUserOrderDTO,
          response: CreateUserOrderResponseDTO,
        },
      ),
  );

export default order;
