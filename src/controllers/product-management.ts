import { Elysia, t } from "elysia";

import { isEmployee } from "../middlewares/isEmployee";
import productService from "../services/productService";
import { GetAllProductDTO } from "../dtos/Product";
import {
  AddProductDTO,
  AddProductResponseDTO,
  AddProductSizeDTO,
  AddProductSizeResponseDTO,
  EditProductDTO,
  EditProductResponseDTO,
  EditProductSizeDTO,
  EditProductSizeResponseDTO,
} from "../dtos/ProductManagement";
import productManagementService from "../services/productManagementService";

export const productManagement = async (app: Elysia) =>
  app.group("/product-management", (app) =>
    app
      .use(isEmployee)
      .get(
        "/products",
        async () => {
          return await productService.findAllProducts();
        },
        {
          response: GetAllProductDTO,
        },
      )
      .post(
        "/products/add",
        async ({ body }) => {
          return await productManagementService.addProduct(body);
        },
        {
          body: AddProductDTO,
          response: AddProductResponseDTO,
        },
      )
      .post(
        "/products/sizes/add",
        async ({ body }) => {
          return await productManagementService.addProductSize(body);
        },
        {
          body: AddProductSizeDTO,
          response: AddProductSizeResponseDTO,
        },
      )
      .post(
        "/products/edit",
        async ({ body }) => {
          return await productManagementService.editProduct(body);
        },
        {
          body: EditProductDTO,
          response: EditProductResponseDTO,
        },
      )
      .post(
        "/products/sizes/edit",
        async ({ body }) => {
          return await productManagementService.editProductSize(body);
        },
        {
          body: EditProductSizeDTO,
          response: EditProductSizeResponseDTO,
        },
      ),
  );

export default productManagement;
