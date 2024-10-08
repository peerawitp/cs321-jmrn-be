import { Elysia } from "elysia";
import productService from "../services/productService";
import { GetAllProductDTO, GetAllProductQueryDTO } from "../dtos/Product";
import { TireType } from "@prisma/client";

export const product = async (app: Elysia) =>
  app.group("/product", (app) =>
    app.get(
      "get-all",
      async ({ query }) => {
        if (query.type) {
          return await productService.findAllProductsByType(
            query.type as TireType,
          );
        }
        return await productService.findAllProducts();
      },
      {
        query: GetAllProductQueryDTO,
        response: GetAllProductDTO,
      },
    ),
  );

export default product;
