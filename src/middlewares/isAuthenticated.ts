import { Elysia } from "elysia";
import { jwtAccess } from "../jwt";
import { db } from "../db";

export const isAuthenticated = (app: Elysia) =>
  app.use(jwtAccess).derive(async function handler({
    jwt,
    request: { headers },
  }) {
    const authorization = headers.get("authorization");
    if (!authorization) throw new Error("UNAUTHORIZED");

    const token = authorization.split(" ")[1];
    if (!token) throw new Error("UNAUTHORIZED");

    const payload = await jwt.verify(token);
    if (!payload) throw new Error("INVALID_TOKEN");

    const { id } = payload;
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) throw new Error("BAD_TOKEN");

    return {
      user,
    };
  });
