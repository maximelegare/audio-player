import { sql_query_string } from "../../lib/db";

import { db } from "../../lib/db";

const handler = async (req, res) => {

  try {
    const response = await db.query(
      `
      SELECT s.title, a.picture_url, a.artist, s.title_route as song_route FROM songs s JOIN albums a ON s.album = a.title  WHERE s.title LIKE '%${req.query.q}%' LIMIT 5
    `,
    );

    
    return res.status(200).json({ data:response });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
