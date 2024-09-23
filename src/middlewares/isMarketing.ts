import { Elysia } from "elysia";
import { isAuthenticated } from "./isAuthenticated";

export const isMarketing = (app: Elysia) =>
  app.use(isAuthenticated).derive(async function handler({ user }) {
    if (user.role !== "MARKETING") throw new Error("UNAUTHORIZED");
    return { user };
  });
