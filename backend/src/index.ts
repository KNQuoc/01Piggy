import { Hono } from "hono";
import authRoute from "./routes/auth.route";
import { PinataSDK } from "pinata";
import { PGlite } from "@electric-sql/pglite";

const app = new Hono();

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;
const PINATA_GROUP_ID = process.env.GROUP_ID;

let db;

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

async function initDB(): Promise<string> {
  try {
    // const files = await pinata.files
    //   .list()
    //   .group(PINATA_GROUP_ID!)
    //   .order("DESC");

    // if (files.files) {
    //   const dbFile = await pinata.gateways.get(files.files[0].cid);
    //   const file = dbFile.data as Blob;
    //   db = new PGlite({ loadDataDir: file });
    //   return files.files[0].created_at;
    // }
    db = new PGlite("piggy");
    await db.exec(`CREATE TABLE IF NOT EXISTS account(
        account_id INT PRIMARY KEY,
        username VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        balance BIGINT NOT NULL DEFAULT 0,
        sub_account_num INT DEFAULT 0
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS sub_account(
      sub_account_id INT PRIMARY KEY,
      username VARCHAR(200),
      password VARCHAR(200),
      account_id INT,
      money INT DEFAULT 0,
      FOREIGN KEY(account_id) REFERENCES account(account_id)
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS marketplace(
      item_id INT PRIMARY KEY,
      item_name VARCHAR(200),
      price INT NOT NULL
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS transaction (
      transaction_id INT PRIMARY KEY,
      transaction_date DATE NOT NULL,
      item_id INT,
      item_quantity INT,
      sub_account_id INT,
      account_id INT,
      FOREIGN KEY(account_id) REFERENCES account(account_id),
      FOREIGN KEY(item_id) REFERENCES marketplace(item_id),
      FOREIGN KEY(sub_account_id) REFERENCES sub_account(sub_account_id)
      );`);

    console.log("New db created");
    return "New db created";
  } catch (error) {
    console.log(error);
    throw error;
  }
}

(async () => {
  try {
    const status = await initDB();
    console.log("Database initialize", status);
  } catch (error) {
    console.log(error);
    return error;
  }
})();

app.route("/auth", authRoute);

export default app;
