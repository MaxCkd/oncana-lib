import { getUploadUrl, uploadToS3 } from "./api";

const toBlob = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onprogress = (e) => {};
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error parsing file"));
  });

const fileToBlob = async (file: File) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

export const uploadImage = async (file: File) => {
  const [blob, responseUrlUpload] = await Promise.all([
    fileToBlob(file),
    getUploadUrl(file.name, file.type),
  ]);

  if (!responseUrlUpload.ok) throw new Error("Could not get url upload");

  const { uploadUrl } = await responseUrlUpload.json();

  const responseUpload = await uploadToS3(uploadUrl, blob);

  if (!responseUpload.ok) throw new Error("Could not upload the image");

  return responseUpload.url;
};
