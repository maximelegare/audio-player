import mm from "music-metadata/";
import multer from "multer";
import fs from "fs";


import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

import { createStreamFromBuffer } from "../../lib/utilities";

// import { useGoogleDrive } from "../../hooks/useGoogleDrive";
import { googleDriveAPI } from "../../lib/googledrive";

import { sql_insert } from "../../lib/db";

import { google } from "googleapis";


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
   
    dataObject = {
      title: title,
      track_no: track.no,
      album_track_no: track.of,
      artist: artist,
      album: album,
      year: year,
      duration: duration,
    };

    const res = await uploadFile({
      title,
      mimeType: file.mimeType,
      buffer: file.buffer,
    });
    // const res = await uploadFile()

    // console.log(metadata.common.picture[0].data)

    // if (metadata.common.picture) {
    //   image = compressBuffer(metadata.common.picture[0].data);
    // }


    // await sql_insert("songs", dataObject);

    });
  });
  res.status(200).json({ message: "done" });
}

// Compress the image buffer to reduce the quality of the image
async function compressBuffer(buffer) {
  try {
    const compBuf = await imagemin.buffer(buffer, {
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({
          quality: [0.4, 0.6],
        }),
      ],
    });
    console.log("worked");
  } catch (err) {
    console.log(err);
  }

  return compBuf;
}

// Upload file to google Drive
// https://www.npmjs.com/package/googleapis

const uploadFile = async ({title, mimeType, buffer}) => {
  // Transform buffer in Iint8Array which is required by google drive
  
  

  const response = await googleDriveAPI.files.create({

    // It is created in two steps, the requestBody, with name & mimeType
    // Parent is the Shared folder ID between my account & Service account
    requestBody: {
      name: title,
      parents:["1jyCNF_TSPiaCZRy2aAuN_vqcIQQ_LiW1"],
      mimeType:mimeType,
      
      // parents: ["1jyCNF_TSPiaCZRy2aAuN_vqcIQQ_LiW1"],
    },

    // And the media that contain the file
    media: {
      mimeType:mimeType,
      body: createStreamFromBuffer(buffer),
      
    },
    // fields:"download_url"
  });
  console.log(response.data)
  return response;
};
