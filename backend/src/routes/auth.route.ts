import { Hono } from "hono";
import { login, signup } from "../services/auth.service";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;

const authRoute = new Hono();

authRoute.post("/login", async (c: any) => {
  const { username, password } = await c.req.json();
  if (!username || !password) {
    return c.json({ error: "Please provide correct username and password" });
  }
  const user = await login(username, password);

  return c.json({ user: user.password });
});

authRoute.post("/signup", async (c: any) => {
  const { username, password } = await c.req.json();
  const result = signup(username, password);
  return c.json({ result: result });
});

export default authRoute;
