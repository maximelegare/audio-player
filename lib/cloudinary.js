const cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryUpload = async (file, title) => {
    
//   cloudinary.uploader
//     .upload_stream(
//       {
//         resource_type: "audio",
//       },
//       (result) => console.log(result)
//     )
//     .end(file.buffer);

    let uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "audio/flac",
        public_id: `_music/${title}`,
        chunk_size:60000
      },
      (err, results) => {
        console.log(err, results);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
};
