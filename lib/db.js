const fs = require("fs");

// const mysql = require("mysql2/");

// export const db = mysql.createConnection({
//   config: {
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD,
//   },
// });

// export async function sql_insert(table, values) {
//   try {
//     // Uses escapes to prevent SQL injections
//     // Create a connection automatically by calling querry

//     const results = db.query(
//       `INSERT INTO ${table} SET ?`,
//       values,
//       function (err, results, field) {
//         if (err) throw err;
//       }
//     );
//     // End database connection
//     db.end();
//     return results;
//   } catch (err) {
//     throw Error(err.message);
//   }
// }

// // Insert in multiple table in same Query
// export async function sql_insert_transation({ album, song }) {
//   const sqlAlbum = createSqlFromColumnsAndValues(
//     album.table,
//     album.columns,
//     album.values
//   );

//   const sqlSong = createSqlFromColumnsAndValues(
//     song.table,
//     song.columns,
//     song.values
//   );

//   try {
//     let results = await db
//       .transaction()
//       .query(sqlSong, song.values)
//       .query(sqlAlbum, album.values)
//       .rollback((e) => {
//         console.log(e);
//       }) // optional
//       .commit();
//   } catch (err) {
//     throw err;
//   }
// }

// // Select Query
// export async function sql_query_string(stringQuerry) {
//   try {
//     if (stringQuerry) {
//       db.query(stringQuerry, function (err, results) {
//         if (err) throw err;
//         return results;
//       });
//       db.end();
//     }

//     // db.end();
//   } catch (err) {
//     throw Error(err.message);
//   }
// }

// const createSqlFromColumnsAndValues = (table, columns, values) => {
//   // Join every element of the Array with comma
//   let sql = `INSERT IGNORE INTO ${table} (${columns.join(",")}) VALUES (`;

//   // Remplce every values with ?
//   for (let i = 0; i < values.length; i++) {
//     sql += "?";

//     // If it's not the last one, comma
//     if (i !== values.length - 1) {
//       sql += ",";
//     }
//   }
//   sql += ")";
//   return sql;
// };

const mysql = require("mysql2/promise");

export async function sql_query_string(query, values = []) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ssl: { ca: fs.readFileSync(process.env.MYSQL_SSL_CA) },
  });

  const [rows, fields] = await db.execute(query, values);
  return rows;
}
