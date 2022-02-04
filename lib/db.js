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
  try{
    
    // Uses escapes to prevent SQL injections
    // Create a connection automatically by calling querry
    const results = await db
      .query(`INSERT INTO ${table} SET ?`,
        values, function(err, results, field)  {
        if(err) throw err
      })
     
    // End database connection
    await db.end()
    return results
  }catch(e){
    throw Error(e.message)
  }
}


 
      //   await sql_query(
      //     `INSERT INTO songs (title, artist, album)
      //    VALUES ('${title}', '${artist}', '${album}')`
      //   );
      // } catch (e) {
      //   console.log(e)
      // 