import { Elysia, t } from "elysia";

import { isMarketing } from "../middlewares/isMarketing";
import orderManagementService from "../services/orderManagementService";
import { GetAllOrderResponseDTO } from "../dtos/orderManagement";
import { OrderStatus } from "@prisma/client";

export const orderManagement = async (app: Elysia) =>
  app.group("/order-management", (app) =>
    app
      .use(isMarketing)
      .get(
        "/get-all-order",
        async () => {
          const orders = await orderManagementService.getAllOrder();
          return orders;
        },
        { response: GetAllOrderResponseDTO },
      )
      .post(
        "/update-order-status",
        async (req) => {
          const { orderId, status } = req.body;
          return await orderManagementService.updateOrderStatus(
            orderId,
            status,
          );
        },
        {
          body: t.Object({
            orderId: t.Number(),
            status: t.String({ enum: OrderStatus }),
          }),
        },
      ),
  );

export default orderManagement;
