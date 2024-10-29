import {
  AddProductDTOType,
  AddProductSizeDTOType,
  EditProductDTOType,
  EditProductSizeDTOType,
} from "../dtos/ProductManagement";
import { db } from "../db";
import { TireType, WheelType } from "@prisma/client";
import fileService, { ImageType } from "./fileService";

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
  const imageUri = await fileService.uploadFile(
    product.image,
    ImageType.PRODUCT,
  );

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

const editProduct = async (product: EditProductDTOType) => {
  const existingProduct = await db.product.findFirst({
    where: {
      id: parseInt(product.id),
    },
  });
  if (!existingProduct) throw new Error("Product does not exist");

  if (product.image) {
    const imageUri = await fileService.uploadFile(
      product.image,
      ImageType.PRODUCT,
    );
    existingProduct.imageUrl = imageUri;
  }

  existingProduct.name = product.name || existingProduct.name;
  existingProduct.description =
    product.description || existingProduct.description;
  existingProduct.patternAndType =
    product.patternAndType || existingProduct.patternAndType;
  existingProduct.wheel = (product.wheel as WheelType) || existingProduct.wheel;
  existingProduct.type = (product.type as TireType) || existingProduct.type;

  const updatedProduct = await db.product.update({
    where: {
      id: parseInt(product.id),
    },
    data: existingProduct,
  });

  return updatedProduct;
};

const editProductSize = async (productSize: EditProductSizeDTOType) => {
  const existingProductSize = await db.productSize.findFirst({
    where: {
      id: productSize.id,
    },
  });
  if (!existingProductSize) throw new Error("Product size does not exist");

  existingProductSize.name = productSize.name || existingProductSize.name;
  existingProductSize.overallDiameter =
    productSize.overallDiameter || existingProductSize.overallDiameter;
  existingProductSize.overallWidth =
    productSize.overallWidth || existingProductSize.overallWidth;
  existingProductSize.measurementRim =
    productSize.measurementRim || existingProductSize.measurementRim;
  existingProductSize.standardRim =
    productSize.standardRim || existingProductSize.standardRim;
  existingProductSize.price = productSize.price || existingProductSize.price;
  existingProductSize.quantity =
    productSize.quantity || existingProductSize.quantity;

  const updatedProductSize = await db.productSize.update({
    where: {
      id: productSize.id,
    },
    data: existingProductSize,
  });

  return updatedProductSize;
};

export default {
  addProduct,
  addProductSize,
  editProduct,
  editProductSize,
};
