var SSH2Promise = require("ssh2-promise");
const fs = require("fs");

var sshConfig = {
  host: process.env.SSH_RASBERRY_HOST,
  username:process.env.SSH_RASBERRY_USERNAME,
  password: process.env.SSH_RASBERRY_PASSWORD,
};
// const sshConfig = ;

const handler = async (req, res) => {
  //   console.log(sshConfig);

  const sshFolderPath = process.env.RASBERRY_HODEI_PATH;
  const ssh = new SSH2Promise(sshConfig);

  const range = req.headers.range;

  const sftp = ssh.sftp();
  await sftp
    .createReadStream(`'${sshFolderPath}'`)
    .then((stream) => console.log(stream));

  await sftp
    .readdir(sshFolderPath)
    .then((data) => {
      console.log(data); //file listing
    })
    .catch((err) => {
      console.log(err);
    });

  ssh.close().then(console.log("Closed Connection"));
};
export default handler;
