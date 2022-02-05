import mm from "music-metadata/";
import multer from "multer";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

import { googleDriveAPI } from "../../lib/googledrive";

import { sql_insert } from "../../lib/db";

import { uploadFileToGoogleDrive } from "../../lib/googledrive";

// To make mutler parse the file
export const config = {
  api: {
    bodyParser: false,
  },
};

// Library that receive files
const upload = multer();

export default function handler(req, res) {
  // Receive the file from front end
  upload.any()(req, {}, async (err) => {
    const files = req.files;
    if (err) {
      throw err;
    }

    let image;
    let dataObject;

    // Loop through files
    files.forEach(async (file) => {
      // Get the metadata of the file with it's buffer
      const {
        common: { title, track, artist, album, year },
        format: { duration },
      } = await mm.parseBuffer(file.buffer, file.mimetype, {
        duration: true,
      });
      const fileData = await mm.parseBuffer(file.buffer, file.mimetype, {
        duration: true,
      });

      const streamingUrl = await uploadFileToGoogleDrive({
        title,
        mimeType: file.mimeType,
        buffer: file.buffer,
      });

      console.log(streamingUrl)
      dataObject = {
        title: title,
        track_no: track.no,
        album_track_no: track.of,
        artist: artist,
        album: album,
        year: year,
        duration: duration,
        streaming_url: streamingUrl,
      };



      // console.log(metadata.common.picture[0].data)

      // if (metadata.common.picture) {
      //   image = compressBuffer(metadata.common.picture[0].data);
      // }

      await sql_insert("songs", dataObject);
    });
  });
  res.status(200).json({ message: "done" });
}

// Compress the image buffer to reduce the quality of the image
// async function compressBuffer(buffer) {
//   try {
//     const compBuf = await imagemin.buffer(buffer, {
//       plugins: [
//         imageminMozjpeg(),
//         imageminPngquant({
//           quality: [0.4, 0.6],
//         }),
//       ],
//     });

//     return compBuf;

//   } catch (err) {
//     console.log(err);
//   }

// }
