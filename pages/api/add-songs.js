import mm from "music-metadata/";

import { sql_insert_transation } from "../../lib/db";


import { createUrlRouteWithTitle } from "../../lib/utilities";


import { sql_select } from "../../lib/db";
import { sql_insert } from "../../lib/db";


import formidable from 'formidable-serverless';

// To make formidable the file handler 
export const config = {
  api: {
    externalResolver: true,
  },
};


export default async function handler(req, res) {
  
  
  // Library that receive files
  const form = new formidable.IncomingForm()
  form.keepExtensions = true;
  
  // Receive the file from front end
  form.parse(req, async (err, fields, files) => {
    if(err){
      return res.status(400).json({message:err})
    }
    
    
      // Loop through files
      files.forEach(async (file) => {
        // Get the metadata of the file with it's buffer
        const {
          common: { title, track, artist, album, year, picture },
          format: { duration },
        } = await mm
          .parseBuffer(file.buffer, file.mimetype, {
            duration: true,
          })
          .catch((err) => console.log(err));
  
        const gDriveFileName = `${artist} - ${album} - ${title}`;
  
        // Checks if the album exists in the Albums table
        // const existsQuery = `EXISTS(SELECT title, album_id FROM albums WHERE title = '${album}')`;
  
        // const res = await sql_select(`SELECT ${existsQuery}`)
        // const albumExists = res[0][existsQuery]
  
        const res = await sql_select(
          `SELECT picture_url FROM albums WHERE title = '${album}' LIMIT 1`
        );
        const albumLink = res[0]?.picture_url;
  
  
  
        // Upload music file to google drive
        // const streamingUrl = await uploadFileToGoogleDrive({
        //   title: gDriveFileName,
        //   mimeType: file.mimetype,
        //   buffer: file.buffer,
        //   parents: musicFolder,
        // }).catch((err) => console.log(err));
  
        // If there is a picture in the file, upload the picture to google drive & the album does not exist in db
  
        
        // If the album does not exists in the db
        if (!albumLink) {
  
          let pictureUrl;
          if (picture) {
  
  
  
            // Upload to google Drive
            // pictureUrl = await uploadFileToGoogleDrive({
            //   title: `${artist} - ${album}`,
            //   mimeType: picture[0].format,
            //   buffer: picture[0].data,
            //   parents: coverFolder,
            // }).catch((err) => console.log(err));
          }
  
          // Create data for the db
          const albumData = {
            title: album,
            title_route: createUrlRouteWithTitle(artist, album),
            picture_url: pictureUrl,
            year: year,
            artist: artist,
            artist_route: createUrlRouteWithTitle(artist),
          };
  
          const songData = {
            title: title,
            track_no: track.no,
            album_track_no: track.of,
            album: album,
            duration: duration,
            streaming_url: streamingUrl,
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
        }else{
  
          const songData = {
            title: title,
            track_no: track.no,
            album_track_no: track.of,
            album: album,
            duration: duration,
            streaming_url: streamingUrl,
          };
  
          await sql_insert("songs", songData)
  
  
        }
  
      });

    return res.json(files)


  })

}
