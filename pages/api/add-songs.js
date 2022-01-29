import mm from "music-metadata/";
import multer from "multer";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

import { sql_insert } from "../../lib/db";

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

    let image;
    let dataObject;

    // Loop through files
    files.forEach(async (file) => {
      // Get the metadata of the file with it's buffer
      const metadata = await mm.parseBuffer(file.buffer, file.mimetype, {
        duration: true,
      });

      dataObject = {
        title: metadata.common.title,
        track_no: metadata.common.track.no,
        album_track_no: metadata.common.track.of,
        artist: metadata.common.artist,
        album: metadata.common.album,
        year: metadata.common.year,
        duration: metadata.format.duration,
      };
      // console.log(metadata.common.picture[0].data)

      // if (metadata.common.picture) {
      //   image = compressBuffer(metadata.common.picture[0].data);
      // }

      // try {
      //   await sql_query(
      //     `INSERT INTO songs (title, artist, album)
      //    VALUES ('${title}', '${artist}', '${album}')`
      //   );
      // } catch (e) {
      //   console.log(e)
      // }
      await sql_insert("songs", dataObject);
    });
  });
  res.status(200).json({ message: "done" });
}
async function compressBuffer(buffer) {
  const compBuf = await imagemin
    .buffer(buffer, {
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    })
    .then(() => {
      console.log("worked");
    })
    .catch((err) => console.log(err));
  return compBuf;
}
