import { Dropbox } from "dropbox";


const config = {
    clientId:process.env.DROPBOX_CLIENT_ID,
    clientSecret:process.env.DROPBOX_CLIENT_SECRET
}

export const dbx = new Dropbox(config)



