import { PGlite } from "@electric-sql/pglite";
import {
  decode as JwtDecode,
  sign as JwtSign,
  verify as JwtVerify,
} from "hono/jwt";
import { HTTPException } from "hono/http-exception";

const JWT_SECRET: any = process.env.JWT_SECRET;

let db = new PGlite("piggy");

export const login = async (username: string, password: string) => {
  try {
    const currentUser: any = await db.query(
      `SELECT * FROM account WHERE username = $1;`,
      [username]
    );

    if (currentUser.rows.length === 0) {
      return { error: "No user with that username" };
    }

    const isMatch = await Bun.password.verify(
      password,
      currentUser.rows[0].password
    );

    if (!isMatch) {
      return { error: "Password does not match" };
    }

    // token sign
    const token = await JwtSign({ sub: username }, JWT_SECRET);

    return {
      message: "Login successful",
      token: token,
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

// Create an account
export const signup = async (username: string, password: string) => {
  try {
    const hashedPassword = await Bun.password.hash(password);
    await db.query(
      `INSERT INTO account (username, password) VALUES ($1, $2);`,
      [username, hashedPassword]
    );
    const result = await db.query(`SELECT * FROM account;`);

    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log("Sign up", error);
  }
};

// Get Profile
export const getProfile = async (username: any) => {
  try {
    const currentUser = await db.query(
      `SELECT * FROM account WHERE username = $1`,
      [username]
    );
    if (currentUser.rows.length === 0) {
      return new HTTPException(404, { message: "Not found user" });
    }
    return currentUser.rows[0];
  } catch (error) {
    return { error: error };
  }
};

export const verifyToken = async (authHeader: string) => {
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { result: "Auth token required", status: 401 };
    }

    const token = authHeader.split(" ")[1];
    const payload = await JwtVerify(token, JWT_SECRET);

    if (!payload || !payload.sub) {
      return { result: "Auth token invalid", status: 403 };
    }
    return payload.sub;
  } catch (error) {
    return { error: error };
  }
};

export const getSubAccounts = async (parentUsername: any) => {
  try {
    const parentUser: any = await db.query(
      `SELECT * FROM account WHERE username = $1`,
      [parentUsername]
    );
    if (parentUser.rows.length === 0) {
      return { error: "No parents account found", status: 404 };
    }

    const parentUserID = parentUser.rows[0].account_id;
    const subAccounts = await db.query(
      `SELECT * FROM sub_account WHERE account_id = $1`,
      [parentUserID]
    );
    if (subAccounts.rows.length === 0) {
      return { message: "No subaccount currently" };
    }

    console.log(subAccounts);
    return {
      message: "Subaccount ok!",
      subAccounts: subAccounts.rows,
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const getSubAccountByID = async (
  parentUsername: any,
  subAccountID: number
) => {
  try {
    const parentUser: any = await db.query(
      `SELECT * FROM account WHERE username = $1`,
      [parentUsername]
    );
    if (parentUser.rows.length === 0) {
      return { result: "No parent account found", status: 404 };
    }
    const parentAccountID = parentUser.rows[0].account_id;
    const subAccount = await db.query(
      `SELECT * FROM sub_account WHERE account_id = $1 AND sub_account_id = $2`,
      [parentAccountID, subAccountID]
    );
    if (subAccount.rows.length === 0) {
      return { error: "No subAccount with that id" };
    }

    return {
      subaccount: subAccount.rows,
      message: "Fetched this account ok",
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const createSubAccount = async (
  parentUsername: any,
  username: string,
  password: string,
  money: number
) => {
  try {
    const parentUser: any = await db.query(
      `SELECT * FROM account WHERE username = $1`,
      [parentUsername]
    );

    // find parent account
    if (parentUser.rows.length === 0) {
      return { result: "No parent account found", status: 404 };
    }

    const parentAccountID = parentUser.rows[0].account_id;

    // Check if the sub account is exceed
    const parentSubAccountNum = parentUser.rows[0].sub_account_num;
    if (parentSubAccountNum > 2) {
      return { result: "You have exceed number of sub account" };
    }

    const hashedPassword = await Bun.password.hash(password);

    // create subaccount
    const result = await db.query(
      `INSERT INTO sub_account (username, password, money, account_id) VALUES($1, $2, $3, $4)`,
      [username, hashedPassword, money, parentAccountID]
    );

    // update parent account_id
    await db.query(
      `UPDATE account SET sub_account_num = sub_account_num + 1 WHERE account_id = $1`,
      [parentAccountID]
    );

    return {
      message: "Subaccount created ok!",
      sub_account_id: result.rows,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateSubaccountByID = async (
  sub_account_id: number,
  parentUsername: any,
  money: number
) => {
  try {
    const parentAccount: any = await db.query(
      `
      SELECT * FROM account WHERE $username = $1
      `,
      [parentUsername]
    );

    if (parentAccount.rows.length === 0) {
      throw new Error("Parent account not found");
    }

    const parentAccountId = parentAccount.rows[0].account_id;

    const subAccount = await db.query(
      `SELECT * FROM sub_account WHERE sub_account_id = $1 AND account_id = $2`,
      [sub_account_id, parentAccountId]
    );

    if (subAccount.rows.length === 0) {
      throw new Error("Subaccount not associated with the parent account");
    }

    // Step 3: Update the subaccount's money field
    const updateResult = await db.query(
      `UPDATE sub_account 
       SET money = $1 
       WHERE sub_account_id = $2 
       RETURNING *`,
      [money, sub_account_id]
    );

    if (updateResult.rows.length === 0) {
      throw new Error("Failed to update subaccount");
    }

    console.log("Updated Subaccount:", updateResult.rows[0]);

    return {
      result: updateResult.rows[0],
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
