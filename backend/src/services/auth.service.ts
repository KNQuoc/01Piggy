import { PinataSDK } from "pinata";
import { PGlite } from "@electric-sql/pglite";

const PINATA_JWT = process.env.PINATA_JWT;
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_GATEWAY = process.env.PINATA_GATEWAY;

let db = new PGlite("piggy");

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

export const login = async (username: string, password: string) => {
  const result = await db.query(`SELECT * FROM account;`);
  return { username: username, password: password };
};

export const signup = async (username: string, password: string) => {
  try {
    const hashedPassword = await Bun.password.hash(password);
    await db.query(
      `INSERT INTO account (account_id, username, password) VALUES ($1, $2, $3);`,
      [1, username, hashedPassword]
    );
    const result = await db.query(`SELECT * FROM account;`);

    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log("Sign up", error);
  }
};
