import { dbx } from "../../lib/dropbox";


const redirectUri = "http://localhost:3000/api/auth/callback"


export default function handler(req, res) {
  dbx.auth
    .getAuthenticationUrl(
      redirectUri,
      null,
      "code",
      "offline",
      null,
      "none",
      false
    )
    .then((authUrl) => {
      res.writeHead(302, { Location: authUrl });
      res.end();
    });
}
