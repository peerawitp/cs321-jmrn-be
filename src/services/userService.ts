import { RegisterDTOType } from "../dtos/Auth";

import { AddAddressDTOType } from "../dtos/User";

import { db } from "../db";

const findUserFromID = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const findUserFromEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const findUserFromPhone = async (phone: string) => {
  const user = await db.user.findUnique({
    where: {
      phone,
    },
  });
  return user;
};

const findAddressFromUserID = async (id: string) => {
  const address = await db.address.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      userId: true,
      houseNumber: true,
      village: true,
      alley: true,
      street: true,
      subDistrict: true,
      district: true,
      province: true,
      postalCode: true,
      country: true,
    },
  });

  return address;
};

const createUser = async (user: RegisterDTOType) => {
  if (await findUserFromEmail(user.email))
    throw new Error("EMAIL_ALREADY_EXIST");
  if (await findUserFromPhone(user.phone))
    throw new Error("PHONE_ALREADY_EXIST");

  const hashedPassword = await Bun.password.hash(user.password);

  const newUser = await db.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  return newUser;
};

const addNewAddress = async (userId: string, address: AddAddressDTOType) => {
  const newAddress = await db.address.create({
    data: {
      userId: userId,
      houseNumber: address.houseNumber,
      village: address.village || "",
      alley: address.alley || "",
      street: address.street,
      subDistrict: address.subDistrict,
      district: address.district,
      province: address.province,
      postalCode: address.postalCode,
      country: address.country,
    },
  });
  return newAddress;
};

export default {
  findUserFromID,
  findUserFromEmail,
  findUserFromPhone,
  findAddressFromUserID,
  createUser,
  addNewAddress,
};
