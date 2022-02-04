import { google } from "googleapis"


// Path to service account file
const KEYPATH = process.env.GOOGLE_APPLICATION_CREDENTIALS

// Will take care of authentification
// To use service account with my account, I need to share the folder with the service account email.

// Service account are like dummy user, to access file, they need authorization

// Google drive => rightClick => Share => service account email
// Create the file in directory ID
const auth = new google.auth.GoogleAuth({
  keyFile: KEYPATH,

  // Gives full access to Drive API
  scopes: ['https://www.googleapis.com/auth/drive'],
});


// Drive API
export const googleDriveAPI = google.drive({
  version: "v3",
  auth:auth,
});

