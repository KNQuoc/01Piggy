import { Hono } from "hono";
import { createItem, getItems } from "../services/order.service";

const orderRoute = new Hono();

orderRoute.post("/items", async (c: any) => {
  const { item_name, price } = await c.req.json();
  const result = await createItem(item_name, price);
  return c.json({ result: result });
});

orderRoute.get("/items", async (c: any) => {
  const result = await getItems();
  return c.json({ result: result });
});

export default orderRoute;
