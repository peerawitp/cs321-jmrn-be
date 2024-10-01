import { jwt } from "@elysiajs/jwt";
import { UserRole } from "@prisma/client";
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
      firstName: t.String(),
      lastName: t.String(),
      role: t.String({
        enum: UserRole,
      }),
    }),
    secret: process.env.JWT_SECRET!,
    exp: "3d",
  }),
);
