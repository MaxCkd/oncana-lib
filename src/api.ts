import { WebflowUser } from "./Types/type";

// export const api = "http://127.0.0.1:3000/dev";
export const api = import.meta.env.API;

const update = api + "/webflow";
const getPresignedUrl = api + "/get-presigned-url";

const headers = {
  "Content-Type": "application/json",
  Accept: "*",
};

export const getUploadUrl = (filename: string, filetype: string) => {
  return fetch(getPresignedUrl, {
    method: "POST",
    body: JSON.stringify({
      filename,
      filetype,
    }),
  });
};

export const uploadToS3 = (url: string, blob: Blob) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "*",
      "Content-Type": "image/png",
    },
    body: blob,
  });
};

export const updateUser = (body: Partial<WebflowUser>) => {
  return fetch(update, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });
};
