import { getUploadUrl, uploadToS3 } from "./api";

// const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

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

export const previewImage = (
  imageInput: HTMLInputElement,
  imagePreview: HTMLImageElement
) => {
  imageInput.addEventListener("change", (event: any) => {
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
  });
  imagePreview.addEventListener("load", () => {
    URL.revokeObjectURL(imagePreview.src); // free memory
  });
};
