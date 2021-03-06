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
export const createStreamFromBuffer = (buffer) => {
  return Readable.from(buffer);
};

// Remove the spaces and remplace with "-" and lowerca
export const createUrlRoute = (arr) => {
  let route = [];
  arr.map((str) => {
    route.push(str.replace(/\s/g, "-").toLowerCase());
  });
  return `/${route.join("/")}`;
};



export const shuffleArray = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}