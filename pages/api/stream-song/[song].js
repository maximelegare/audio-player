const SSH2Promise = require("ssh2-promise");
const fwd = require("fwd-stream");

const sshConfig = {
  host: process.env.SSH_RASBERRY_HOST,
  username: process.env.SSH_RASBERRY_USERNAME,
  password: process.env.SSH_RASBERRY_PASSWORD,
};

let ssh = null;
let sftp = null;

const handler = async (req, res) => {
  
  const { song } = req.query;

  const sshFolderPath = process.env.RASBERRY_HODEI_PATH;
  const filePath = `${sshFolderPath}/_music/${song}`;

  if(!ssh){
    ssh = new SSH2Promise(sshConfig);
    await ssh.connect();
    sftp = ssh.sftp();
  }

  // Make sure there is a range
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }


  const fileSize = await sftp.getStat(filePath).then((stats) => stats.size);

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

  res.writeHead(206, headers)

  await sftp
    .createReadStream(filePath, { start, end })
    .then((stream) => fwd.readable(stream).pipe(res));

};
export default handler;
