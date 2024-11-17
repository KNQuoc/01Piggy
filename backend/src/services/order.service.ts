import { PGlite } from "@electric-sql/pglite";

let db = new PGlite("piggy");

export const createItem = async (item_name: string, price: number) => {
  try {
    const result = await db.query(
      `INSERT INTO marketplace (item_name, price) VALUES($1, $2)`,
      [item_name, price]
    );
    return {
      message: "Create item ok",
      result: result,
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const getItems = async () => {
  try {
    const result = await db.query(`SELECT * FROM marketplace`);
    if (result.rows.length === 0) {
      return { message: "No item currently" };
    }

    console.log(result.rows);
    return {
      result: result.rows,
      message: "Fetched ok for items",
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
