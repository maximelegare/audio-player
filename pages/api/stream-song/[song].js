import fs from "fs"

// import song from "../../../public/assets/audio/the-denotes-let-us-run-for-it.mp3"

const handler = async (req, res) => {
  //   console.log(sshConfig);
  // const {song} = req.query  

  const filePath = ""
  

 
  // Make sure there is a range
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  
  const fileSize = fs.statSync(filePath).size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/flac",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(filePath, {start, end})
  videoStream.pipe(res)


};
export default handler;
