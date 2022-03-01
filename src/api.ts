import { WebflowUser } from "./type";

export const api = "http://127.0.0.1:3000/dev";

// const getCollectionsApi = api + "/webflow/multi-ref";
const update = api + "/webflow";
const getPresignedUrl = api + "/get-presigned-url";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getUploadUrl = (filename: string, filetype: string) => {
  return fetch(getPresignedUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      filename,
      filetype,
    }),
  });
};

export const uploadToS3 = (url: string, blob: Blob) => {
  return fetch(url, {
    method: "PUT",
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
