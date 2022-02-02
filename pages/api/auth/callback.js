import { dbx } from "../../../lib/dropbox";

export default function handler(req, res){
    const { code } = req.query;
    console.log(`code:${code}`);
  
    dbx.auth.getAccessTokenFromCode(redirectUri, code)
      .then((token) => {
        console.log(`Token Result:${JSON.stringify(token)}`);
        dbx.auth.setRefreshToken(token.result.refresh_token);
        dbx.usersGetCurrentAccount()
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
}
