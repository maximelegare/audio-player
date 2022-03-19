import mm from "music-metadata/";

import { sql_insert_transation } from "../../lib/db";

import { createUrlRoute } from "../../lib/utilities";

import { sql_query_string } from "../../lib/db";
import { sql_insert } from "../../lib/db";

import { cloudinaryUpload, cloudinaryBufferUpload } from "../../lib/cloudinary";

import formidable from "formidable-serverless";

// To make mutler parse the file
export const config = {
  api: {
    bodyParser: false,
  },
};

// Library that receive files

const musicFolder = "1jyCNF_TSPiaCZRy2aAuN_vqcIQQ_LiW1";
const coverFolder = "16Nn2V24cKI1RoGcqMkvU_3IuyZBSzBI5";

export default async function handler(req, res) {
  // Receive the file from front end

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    // Loop through files
    files.files.forEach(async (file) => {
      // Get the metadata of the file with it's buffer
      const {
        common: { title, track, artist, album, year, picture },
        format: { duration },
      } = await mm
        .parseFile(file.path, {
          duration: true,
        })
        .catch((err) => console.log(err));

      // Create fileName for cloudinary
      const songName = `${artist}-${album}-${title}`;
      const coverName = `${artist}-${album}`;
      


      // Checks if the album exists in the Albums table
      const sql = `EXISTS(SELECT 1 FROM albums WHERE title = '${album}')`
      const res = await sql_query_string(
        `SELECT ${sql}`
      );
      
      const albumLink = await res[0][sql];
        
      
      // Upload music file to Cloudinary
      const streamingUrl = await cloudinaryUpload(
        file.path,
        songName,
        "_music"
      );
      



      // If there is a picture in the file, upload the picture to google drive & the album does not exist in db
      // If the album does not exists in the db
      if (!albumLink) {
        let pictureUrl;

        if (picture) {
          // Upload to cloudinary
          pictureUrl = await cloudinaryBufferUpload(
            picture[0].data,
            coverName,
            "_cover"
          );
        }

        // Create data for the db
        const albumData = {
          title: album,
          title_route: createUrlRoute([artist, album]),
          picture_url: pictureUrl,
          year: year,
          artist: artist,
          artist_route: createUrlRoute([artist]),
        };

        const songData = {
          title: title,
          track_no: track.no,
          album_track_no: track.of,
          album: album,
          duration: Math.round(duration),
          streaming_url: streamingUrl,
          title_route:createUrlRoute([artist, album, title])
        };

        // Creates colomns and values to upload to db
        const albumColumns = Object.keys(albumData);
        const albumValues = Object.values(albumData);

        const songColumns = Object.keys(songData);
        const songValues = Object.values(songData);

        // Makes a transation to insert into songs & albums

        await sql_insert_transation({
          album: {
            columns: albumColumns,
            values: albumValues,
            table: "albums",
          },
          song: {
            columns: songColumns,
            values: songValues,
            table: "songs",
          },
        });

        // If the album already exists
      } else {
        const songData = {
          title: title,
          track_no: track.no,
          album_track_no: track.of,
          album: album,
          duration: duration,
          streaming_url: streamingUrl,
        };

        await sql_insert("songs", songData);
      }
    });
    return res.json(files);
  });
}
