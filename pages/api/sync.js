const exec = require("ssh-exec");

const sshFolderPath = process.env.RASBERRY_HODEI_PATH;
const filePath = `${sshFolderPath}/sync/sync_songs.py`;

const sshConfig = {
  host: process.env.SSH_RASBERRY_HOST,
  user: process.env.SSH_RASBERRY_USERNAME,
  password: process.env.SSH_RASBERRY_PASSWORD,
};

const handler = async (req, res) => {
  exec(`python3 ${filePath}`, sshConfig).pipe(
    process.stdout,
    function (err, data) {
      if (err) throw err;
      console.log(data);
    }
  );

};
export default handler;

