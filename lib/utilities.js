// import imagemin from "imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminPngquant from "imagemin-pngquant";
import { Readable } from "stream";


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


// Compress the image buffer to reduce the quality of the image
// export async function compressBuffer(bufferImg) {
//   try {
//     const compBuf = await imagemin.buffer(bufferImg, {
//       plugins: [
//         imageminMozjpeg(),
//         imageminPngquant({
//           quality: [0.4, 0.6],
//         }),
//       ],
//     });

//     return compBuf;

//   } catch (err) {
//     console.log(err);
//   }
// }


