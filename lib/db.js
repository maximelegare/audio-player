const fs = require("fs");
const mysql = require("mysql2/promise");

// Connect to db with ssl
const connect = async () => {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    ssl: { ca: process.env.MYSQL_SSL_CA },
  });
}


export async function sql_query_string(query, values = []) {
  const db = await connect()
  const [rows, fields] = await db.execute(query, values);
  db.end()
  return rows;
}


export async function sql_insert(table, values) {
  try {
    const db = await connect()
    const results = db.query(
      `INSERT INTO ${table} SET ?`,
      values,
      function (err, results, field) {
        if (err) throw err;
      }
    );
    // End database connection
    db.end();
    return results;
  } catch (err) {
    throw Error(err.message);
  }
}




// const mysql = require("mysql2/");

// export const db = mysql.createConnection({
//   config: {
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD,
//   },
// });



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
