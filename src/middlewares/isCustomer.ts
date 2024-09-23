import { Elysia } from "elysia";
import { isAuthenticated } from "./isAuthenticated";

export const isCustomer = (app: Elysia) =>
  app.use(isAuthenticated).derive(async function handler({ user }) {
    if (user.role !== "CUSTOMER") throw new Error("UNAUTHORIZED");
    return { user };
  });
