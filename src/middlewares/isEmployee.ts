import { Elysia } from "elysia";
import { isAuthenticated } from "./isAuthenticated";

export const isEmployee = (app: Elysia) =>
  app.use(isAuthenticated).derive(async function handler({ user }) {
    if (user.role !== "MARKETING" && user.role !== "STORE")
      throw new Error("UNAUTHORIZED");
    return { user };
  });
