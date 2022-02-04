import { google } from "googleapis";

import { createStreamFromBuffer } from "./utilities";

// Path to service account file
const KEYPATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Will take care of authentification
// To use service account with my account, I need to share the folder with the service account email.

// Service account are like dummy user, to access file, they need authorization

// Google drive => rightClick => Share => service account email
// Create the file in directory ID
const auth = new google.auth.GoogleAuth({
  keyFile: KEYPATH,

  // Gives full access to Drive APIks
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// Drive API
export const googleDriveAPI = google.drive({
  version: "v3",
  auth: auth,
});


// Create google drive direct link to stream in application
export const createGoogleDriveDirectLink = (id) => {
  return `https://docs.google.com/uc?export=open&amp;id=${id}`;
};


// Upload file to google drive
export const uploadFileToGoogleDrive = async ({ title, mimeType, buffer }) => {


  // It is created in two steps, the requestBody, with name & mimeType
  // Parent is the Shared folder ID between my account & Service account
  const requestBody = {
    name: title,
    parents: ["1jyCNF_TSPiaCZRy2aAuN_vqcIQQ_LiW1"],
    mimeType,
  };

  // Media, containing the file passed with a stream
  const media = {
    mimeType,
    body: createStreamFromBuffer(buffer),
  };

  try {
    const response = await googleDriveAPI.files.create({
      requestBody,
      media,
    });

    // Create url to stream the file
    return createGoogleDriveDirectLink(response.data.id);

  } catch (err) {
    console.log(err);
  }
};
