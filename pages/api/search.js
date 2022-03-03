import { sql_query_string } from "../../lib/db";

import { db } from "../../lib/db";

const handler = async (req, res) => {
  try {
    const songs = await db.query(
      `
    SELECT s.title, s.title_route as song_route, s.liked,  s.album, s.track_no, s.streaming_url, a.picture_url, a.artist, s.duration, a.title_route as album_route, a.artist_route 
    FROM songs s
    JOIN albums a
    ON s.album = a.title   WHERE s.title LIKE '%${req.query.q}%' LIMIT 6
    `
    );
    const albums = await db.query(`
      SELECT title, title_route as song_route, picture_url, artist 
      FROM albums 
	    WHERE title LIKE '%${req.query.q}%' 
      LIMIT 6
      `);

    const artists = await db.query(`
      SELECT DISTINCT (artist) as title,  picture_url, artist_route as song_route
      FROM albums 
	    WHERE artist LIKE '%${req.query.q}%' 
      GROUP BY artist 
      LIMIT 6
      `);

    return res.status(200).json({
      data: [
        { title: "Songs", data: songs },
        { title: "Albums", data: albums },
        {title:"Artists", data:artists}
      ],
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
