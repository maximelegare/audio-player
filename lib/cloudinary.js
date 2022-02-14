const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryUpload = async (filePath, title, folder) => {
  return await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "auto",
      public_id: `${folder}/${title}`,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      }
      return result.secure_url;
    }
  );
};
