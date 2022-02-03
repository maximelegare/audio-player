import { google } from "googleapis"
import { Session } from "next-auth";

// Create instance to use the Drive API
export const auth = new google.auth.OAuth2(

 
);

// Drive API
export const googleDriveAPI = google.drive({
  version: "v3",
  auth:process.env.GOOGLE_API_KEY
});

