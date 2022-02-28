import { sql_query_string } from "../../lib/db";

import { db } from "../../lib/db";

const handler = async (req, res) => {

  try {
    const response = await db.query(
      `
        SELECT title FROM songs where title like '%${req.query.q}%'
    `,
    );
    console.log(response)
    // return res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
