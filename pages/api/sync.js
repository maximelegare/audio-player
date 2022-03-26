var rexec = require("remote-exec");
// const exec = require("ssh-exec");

const sshFolderPath = process.env.RASBERRY_HODEI_PATH;
const filePath = `${sshFolderPath}/sync/sync_songs.py`;

const sshConfig = {
  host: process.env.SSH_RASBERRY_HOST,
  username: process.env.SSH_RASBERRY_USERNAME,
  password: process.env.SSH_RASBERRY_PASSWORD,
};

const hosts = [process.env.SSH_RASBERRY_HOST];

const cmds = [`python3 ${filePath}`];

const handler = async (req, res) => {
  rexec(hosts, cmds, sshConfig, function (err) {
    if (err) {
      res.status(400).json({ message: "Something went wrong.." });
    } else {
      res.status(200).json({ message: "Data Synchronized!" });
    }
  });
};

export default handler;
