import { ReadableStreamBuffer } from "stream-buffers";


// calculate the time that is displayed in sec
export const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);

  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${returnedSeconds}`;
};

export const bufferToUint8Array = (buffer) => {
  const newBuffer = new Uint8Array(buffer.buffer);
  return newBuffer;
};

export const arrayBufferToString = (arrBuff) => {
  const decoder = new TextDecoder("utf-8");

  const stringBuff = decoder.decode(new Uint8Array(arrBuff));
  return stringBuff;
};

export const readableStreamBuffer = new ReadableStreamBuffer({
  frequency: 10, // in milliseconds.
  chunkSize: 2048, // in bytes.
});


