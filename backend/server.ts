import { Application, Router } from "./deps.ts";

const router = new Router();

router.get("/hello", (ctx) => {
  ctx.response.body = { msg: "hello" };
});

router.get("/bye", (ctx) => {
  ctx.response.body = { msg: "bye" };
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port 8080`);
app.listen({ port: 8080 });
