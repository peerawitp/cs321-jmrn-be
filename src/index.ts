import { Elysia } from "elysia";

import { auth } from "./controllers/auth";
import { user } from "./controllers/user";

const app = new Elysia()
  .use(auth)
  .use(user)
  .get("/", () => "Hello Tyre Shop!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
