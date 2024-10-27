import {
  AddProductDTOType,
  AddProductSizeDTOType,
} from "../dtos/ProductManagement";
import { db } from "../db";
import { TireType, WheelType } from "@prisma/client";
import fileService from "./fileService";

const addProduct = async (product: AddProductDTOType) => {
  // check if product name already exists
  const existingProduct = await db.product.findFirst({
    where: {
      name: product.name,
    },
  });

  if (existingProduct) {
    throw new Error("Product already exists");
  }

  // upload image
  const imageUri = await fileService.uploadFile(product.image);

  // create new product
  const newProduct = await db.product.create({
    data: {
      name: product.name,
      description: product.description,
      imageUrl: imageUri,
      patternAndType: product.patternAndType,
      wheel: product.wheel as WheelType,
      type: product.type as TireType,
    },
  });

  return newProduct;
};

const addProductSize = async (productSize: AddProductSizeDTOType) => {
  // check if product exists
  const existingProduct = await db.product.findFirst({
    where: {
      id: productSize.productId,
    },
  });

  if (!existingProduct) throw new Error("Product does not exist");

  // check if product size name already exists
  const existingProductSize = await db.productSize.findFirst({
    where: {
      productId: productSize.productId,
      name: productSize.name,
    },
  });

  if (existingProductSize) throw new Error("Product size already exists");

  // create new product size
  const newProductSize = await db.productSize.create({
    data: {
      productId: productSize.productId,
      name: productSize.name,
      overallDiameter: productSize.overallDiameter,
      overallWidth: productSize.overallWidth,
      measurementRim: productSize.measurementRim,
      standardRim: productSize.standardRim,
      price: productSize.price,
      quantity: productSize.quantity,
    },
  });

  return newProductSize;
};

export default {
  addProduct,
  addProductSize,
};
