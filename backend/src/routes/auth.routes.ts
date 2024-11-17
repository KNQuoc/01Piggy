import { Hono } from "hono";
import {
  createSubAccount,
  getProfile,
  getSubAccountByID,
  getSubAccounts,
  login,
  signup,
  updateSubaccountByID,
  verifyToken,
} from "../services/auth.service";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;

const authRoute = new Hono();

authRoute.post("/login", async (c: any) => {
  const { username, password } = await c.req.json();

  const result = await login(username, password);

  return c.json(result);
});

authRoute.post("/signup", async (c: any) => {
  const { username, password } = await c.req.json();
  const result = signup(username, password);
  return c.json({ result: result });
});

authRoute.get("/profile", async (c: any) => {
  const authHeader = c.req.header("Authorization");
  const username = await verifyToken(authHeader);
  const result = await getProfile(username);
  return c.json({ result: result, username: username });
});

authRoute.get("/profile/subaccounts", async (c: any) => {
  const authHeader = c.req.header("Authorization");
  const username = await verifyToken(authHeader);
  const result = await getSubAccounts(username);
  return c.json({ result: result });
});

authRoute.post("/profile/subaccounts", async (c: any) => {
  const { username, password, money } = await c.req.json();
  const authHeader = c.req.header("Authorization");
  const parentUsername = await verifyToken(authHeader);
  const result = await createSubAccount(
    parentUsername,
    username,
    password,
    money
  );
  return c.json({ result: result });
});

authRoute.get("/profile/subaccounts/:id", async (c: any) => {
  const sub_account_id = c.req.param("id");
  const authHeader = c.req.header("Authorization");
  const parentUsername = await verifyToken(authHeader);
  const result = await getSubAccountByID(parentUsername, sub_account_id);
  return c.json({ result: result });
});

// Add money to the balance
authRoute.put("/profile/subaccounts/:id/updateMoney", async (c: any) => {
  const sub_account_id = c.req.param("id");
  const { money } = await c.req.json();
  const authHeader = c.req.header("Authorization");
  const parentUsername = await verifyToken(authHeader);
  const result = await updateSubaccountByID(
    sub_account_id,
    parentUsername,
    money
  );

  return c.json({ result: result });
});

export default authRoute;
