const { Readable } = require('stream');


// calculate the time that is displayed in sec
export const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);

  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${returnedSeconds}`;
};



// Create a stream to upload big file to google Drive, using a buffer
// Normally, it uses a path, not buffer
export const createStreamFromBuffer = (buffer) =>{
return  Readable.from(buffer)
}


export const createGoogleDriveDirectLink = (id) => {
  return `https://drive.google.com/uc?id=${id}&export=download`
}


"https://drive.google.com/uc?id=1inXquYD6xgSNPqXEyvE9iLNnbaBebMKi&export=download"