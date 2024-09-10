import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import { auth } from "./controllers/auth";

const app = new Elysia()
  .use(swagger())
  .use(auth)
  .get("/", () => "Hello Tyre Shop!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
