// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import mm from "music-metadata";
// import { makeTokenizer } from "@tokenizer/http";

export default async function handler(req, res) {
  
  // const musicUrl = req.body || "http://k007.kiwi6.com/hotlink/63pvscg93o/Inner_voice.mp3";

  // const httpTokenizer = await makeTokenizer(musicUrl);
  // const metadata = await mm.parseFromTokenizer(httpTokenizer);

  // const data = {
  //   metadata: metadata,
  //   url:musicUrl
  // };

  res.status(200).json({ data:"max" });
}
