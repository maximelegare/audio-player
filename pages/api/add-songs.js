import mm from "music-metadata";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer();

export default function handler(req, res) {
  upload.any()(req, {}, (err) => {
    const files = req.files;
    if(err){
      throw err
    }
    files.forEach(async (file) => {
      const metadata = await mm.parseBuffer(file.buffer, file.mimetype)

    })
    
  });
  res.status(200).json({ message: "done" });
}
