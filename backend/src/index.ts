import { Hono } from "hono";
import authRoute from "./routes/auth.routes";
import { PinataSDK } from "pinata";
import { PGlite } from "@electric-sql/pglite";
import orderRoute from "./routes/order.routes";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;

let db: PGlite;

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

async function initDB(): Promise<string> {
  try {
    const files = await pinata.files
      .list()
      .group("01933b2a-dba8-7282-854c-138c8c142f1a")
      .order("DESC");

    let groupId = null;

    if (files.files && files.files.length > 0) {
      const dbFile = await pinata.gateways.get(files.files[0].cid);
      const file = dbFile.data as Blob;
      db = new PGlite({ loadDataDir: file });
      return files.files[0].created_at;
    } else {
      db = new PGlite("piggy");

      await db.query(`CREATE TABLE IF NOT EXISTS account(
        account_id SERIAL PRIMARY KEY,
        username VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        balance BIGINT NOT NULL DEFAULT 0,
        sub_account_num INT DEFAULT 0
      );`);

      await db.query(`CREATE TABLE IF NOT EXISTS sub_account(
      sub_account_id SERIAL PRIMARY KEY,
      username VARCHAR(200),
      password VARCHAR(200),
      account_id INT,
      money INT DEFAULT 0,
      FOREIGN KEY(account_id) REFERENCES account(account_id)
      );`);

      await db.query(`CREATE TABLE IF NOT EXISTS marketplace(
      item_id SERIAL PRIMARY KEY,
      item_name VARCHAR(200),
      price INT NOT NULL
      );`);

      await db.query(`CREATE TABLE IF NOT EXISTS transaction (
      transaction_id SERIAL PRIMARY KEY,
      transaction_date DATE NOT NULL,
      item_id INT,
      item_quantity INT,
      sub_account_id INT,
      account_id INT,
      FOREIGN KEY(account_id) REFERENCES account(account_id),
      FOREIGN KEY(item_id) REFERENCES marketplace(item_id),
      FOREIGN KEY(sub_account_id) REFERENCES sub_account(sub_account_id)
      );`);

      // if (!foundGroup) {
      //   const group = await pinata.groups.create({
      //     name: "piggy",
      //     isPublic: true,
      //   });

      const file = (await db.dumpDataDir("gzip")) as File;
      const upload = await pinata.upload
        .file(file)
        .group("01933b2a-dba8-7282-854c-138c8c142f1a")
        .addMetadata({ name: "piggy" });

      return "New db created";
    }
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
app.route("/marketplace", orderRoute);

export default app;
