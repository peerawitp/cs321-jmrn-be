import { Elysia, t } from "elysia";

import orderManagementService from "../services/orderManagementService";
import {
  GetAllOrderResponseDTO,
  UpdateOrderStatusDTO,
  UpdateOrderStatusResponseDTO,
  VerifySlipDTO,
  VerifySlipResponseDTO,
} from "../dtos/OrderManagement";
import { isEmployee } from "../middlewares/isEmployee";

export const orderManagement = async (app: Elysia) =>
  app.group("/order-management", (app) =>
    app
      .use(isEmployee)
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
          body: UpdateOrderStatusDTO,
          response: UpdateOrderStatusResponseDTO,
        },
      )
      .post(
        "/verify-slip",
        async ({ body, user }) => {
          return await orderManagementService.verifySlip(
            body.orderId,
            body.status,
            user.id,
          );
        },
        {
          body: VerifySlipDTO,
          response: VerifySlipResponseDTO,
        },
      ),
  );

export default orderManagement;
