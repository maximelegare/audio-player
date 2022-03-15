const SSH2Promise = require("ssh2-promise");
const fwd = require("fwd-stream");

var sshConfig = {
  host: process.env.SSH_RASBERRY_HOST,
  username: process.env.SSH_RASBERRY_USERNAME,
  password: process.env.SSH_RASBERRY_PASSWORD,
};

const handler = async (req, res) => {
  //   console.log(sshConfig);
  const { song } = req.query;

  console.log();

  const sshFolderPath = process.env.RASBERRY_HODEI_PATH;
  const filePath = `${sshFolderPath}/_music/${song}`;

  const ssh = new SSH2Promise(sshConfig);
  await ssh.connect();
  const sftp = ssh.sftp();

  // await sftp.readFile(filePath).then((data) => console.log(data))

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



  sftp.createReadStream(filePath, { start, end }).then(async (stream) => {
     fwd.readable(stream).pipe(res)
     
  });

  
  const events = ssh.eventNames()
};
export default handler;
