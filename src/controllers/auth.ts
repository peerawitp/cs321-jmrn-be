import { Elysia } from "elysia";
import { db } from "../db";

import { jwtAccess } from "../jwt";

import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "../dtos/Auth";

export const auth = async (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .use(jwtAccess)
      .post(
        "/login",
        async ({ body, jwt }) => {
          const user = await db.user.findUnique({
            where: { email: body.email },
          });
          if (!user) throw new Error("USER_NOT_FOUND");

          const isMatch = await Bun.password.verify(
            body.password,
            user.password,
          );

          if (!isMatch) throw new Error("INVALID_PASSWORD");

          const accessToken = await jwt.sign({ id: user.id });
          return { token: accessToken };
        },
        {
          body: LoginDTO,
          response: LoginResponseDTO,
        },
      )
      .post(
        "/register",
        async ({ body, jwt }) => {
          const isUserExist = await db.user.findUnique({
            where: { email: body.email },
          });
          if (isUserExist) throw new Error("USER_ALREADY_EXIST");

          const hashedPassword = await Bun.password.hash(body.password);

          const user = await db.user.create({
            data: {
              email: body.email,
              password: hashedPassword,
              phone: body.phone,
              firstName: body.firstName,
              lastName: body.lastName,
            },
          });

          const accessToken = await jwt.sign({ id: user.id });
          return {
            id: user.id,
            email: user.email,
            token: accessToken,
          };
        },
        {
          body: RegisterDTO,
          response: RegisterResponseDTO,
        },
      ),
  );

export default auth;
