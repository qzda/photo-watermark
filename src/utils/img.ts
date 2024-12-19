import ExifReader from "exifreader";
import prolog from "@qzda/prolog";

export async function getImgExif(file: File) {
  const tags = await ExifReader.load(file);
  return tags;
}

export function imgFileToDataUrl(file: File) {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    return "";
  }
}

export function log(...arg: any[]) {
  console.log(prolog.green("Photo Frame"));
  console.log(...arg);
}

export const IsDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev";

export function devLog(...arg: any[]) {
  if (IsDev) {
    log(...arg);
  }
}
