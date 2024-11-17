import { Hono } from "hono";

const transactionRoute = new Hono();

transactionRoute.get("/transactions");
transactionRoute.get("/transactions/:id");
