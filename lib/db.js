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

export async function sql_insert_transation({ album, song }) {


  const sqlAlbum = createSqlFromColumnsAndValues(
    album.table,
    album.columns,
    album.values
  );

  const sqlSong = createSqlFromColumnsAndValues(
    song.table,
    song.columns,
    song.values
  );

  try {
    let results = await db
      .transaction()
      .query(sqlAlbum, album.values)
      .query(sqlSong, song.values)
      .rollback((e) => {
        console.log(e);
      }) // optional
      .commit();
    console.log(results);
  } catch (err) {
    throw err;
  }
}




export async function sql_select(
  { rows, table, groupBy, orderBy },
  stringQuerry
) {
  try {
    if (stringQuerry) {
      const results = await db.query(stringQuerry);
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



const createSqlFromColumnsAndValues = (table, columns, values) => {

  // Join every element of the Array with comma
  let sql = `INSERT INTO ${table} (${columns.join(",")}) VALUES (`;

  // Remplce every values with ?
  for (let i = 0; i < values.length; i++) {
    sql += "?";

    // If it's not the last one, comma
    if (i !== values.length - 1) {
      sql += ",";
    }
  }
  sql += ")";
  return sql;
};


