import { Elysia } from "elysia";

import { jwtAccess } from "../jwt";

import userService from "../services/userService";

import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "../dtos/Auth";
import authService from "../services/authService";

export const auth = async (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .use(jwtAccess)
      .post(
        "/login",
        async ({ body, jwt }) => {
          const user = await authService.login(body);

          const accessToken = await jwt.sign({
            id: user.id,
            email: user.email,
          });
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
          const user = await userService.createUser(body);

          const accessToken = await jwt.sign({
            id: user.id,
            email: user.email,
          });
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
