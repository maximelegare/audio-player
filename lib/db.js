import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
});

export async function sql_insert(table, values) {
  try {
    // Uses escapes to prevent SQL injections
    // Create a connection automatically by calling querry
    const results = await db.query(
      `INSERT INTO ${table} SET ?`,
      values,
      function (err, results, field) {
        if (err) throw err;
      }
    );

    // End database connection
    await db.end();
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}

export async function sql_select({ rows, table, groupBy, orderBy }, stringQuerry) {
  try {

    if(stringQuerry){
      const results = await db.query(stringQuerry)
      await db.end();
      return results;
    }

    const results = await db.query(
      `SELECT ${rows}
       FROM ${table}
        ${groupBy && "GROUP BY " + groupBy + " "}
       ${orderBy && "ORDER BY " + orderBy + " "};`
    );
    await db.end();
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}
