import { Elysia } from "elysia";

import { auth } from "./controllers/auth";
import { user } from "./controllers/user";
import { order } from "./controllers/order";
import { product } from "./controllers/product";
import { orderManagement } from "./controllers/order-management";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(auth)
  .use(user)
  .use(order)
  .use(product)
  .use(orderManagement)
  .use(cors())
  .get("/", () => "Hello Tyre Shop!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
