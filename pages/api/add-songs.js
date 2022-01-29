// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import mm from "music-metadata";
// import { makeTokenizer } from "@tokenizer/http";
import mm from "music-metadata";
import multer from "multer";


export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer()

export default function handler (req, res) {
  upload.any()(req, {}, err =>{
    console.log(req.files)
  })
}
