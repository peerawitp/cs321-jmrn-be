import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const jwtAccess = new Elysia({
  name: "jwt",
}).use(
  jwt({
    name: "jwt",
    schema: t.Object({
      id: t.String(),
      email: t.String({
        format: "email",
      }),
    }),
    secret: process.env.JWT_SECRET!,
    exp: "3d",
  }),
);
