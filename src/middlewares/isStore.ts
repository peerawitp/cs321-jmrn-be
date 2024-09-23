import { Elysia } from "elysia";
import { isAuthenticated } from "./isAuthenticated";

export const isStore = (app: Elysia) =>
  app.use(isAuthenticated).derive(async function handler({ user }) {
    if (user.role !== "STORE") throw new Error("UNAUTHORIZED");
    return { user };
  });
