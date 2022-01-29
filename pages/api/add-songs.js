import mm from "music-metadata/";
import multer from "multer";

import { sql_query } from "../../lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};
// Library that receive files
const upload = multer();

export default function handler(req, res) {
  upload.any()(req, {}, (err) => {
    const files = req.files;
    if (err) {
      throw err;
    }

    // Loop through files
    files.forEach(async (file) => {
      // Get the metadata of the file with it's buffer
      const {
        common: { artist, title, album },
      } = await mm.parseBuffer(file.buffer, file.mimetype);

      try {
        await sql_query(
          `INSERT INTO songs (title, artist, album)
         VALUES ('${title}', '${artist}', '${album}')`
        );
      } catch (e) {
        console.log(e)
      }
    });
  });
  res.status(200).json({ message: "done" });
}
