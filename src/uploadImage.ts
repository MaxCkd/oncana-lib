import { getUploadUrl, uploadToS3 } from "./api";
import { imageFeedback, imageInput, imagePreview } from "./selectors";

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

  return responseUpload.url.split("?")[0];
};

const validTypes = ["image/jpeg", "image/png", "image/jpg"];
const validateImage = (image: File) => {
  if (!validTypes.includes(image.type)) {
    return "File type is invalid";
  }
  // Max size 500KB
  if (image.size > 5 * 10 ** 5) {
    return "File is too big.";
  }

  return "ok";
};

export const previewImage = () => {
  imageInput.addEventListener("change", (event: any) => {
    // Check Image validity
    const img = event.target.files[0];
    const isValid = validateImage(img);
    if (isValid === "ok") {
      imagePreview.src = URL.createObjectURL(event.target.files[0]);
      imageFeedback.innerText = "";
    } else {
      imageFeedback.innerText = isValid;
    }
  });
  imagePreview.addEventListener("load", () => {
    URL.revokeObjectURL(imagePreview.src); // free memory
  });
};
