const cloudinary = require("cloudinary").v2;
import streamifier from "streamifier";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload music file using the path
export const cloudinaryUpload = async (filePath, title, folder) => {

  // Returns a promise
  const res = await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "auto",
      public_id: `${folder}/${title}`,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      }
      return result;
    }
  );

  // Return the secure url
  return res.secure_url;
};


// Upload file using the buffer (image contained in the music file)
export const cloudinaryBufferUpload = async (buffer, title, folder) => {

  // Does not return a promise, so create one
  return new Promise((resolve, reject) => {
    let uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `${folder}/${title}`,
      },

      function (error, result) {
        if (result) {
          // Return the secure Url
          return resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    // Create a Read stream to send to cloudinary
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

};
