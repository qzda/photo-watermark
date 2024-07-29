import ExifReader from "exifreader";

export async function getImgExif(file: File) {
  const tags = await ExifReader.load(file);
  console.log(tags);
  return tags;
}

export function imgFileToDataUrl(file: File) {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    return "";
  }
}
