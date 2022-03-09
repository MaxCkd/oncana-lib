import { loader, successMsg, errorMsg } from "./selectors";

export const showLoader = () => {
  hideError();
  hideSuccess();
  loader.style.display = "flex";
  loader.innerText = "Loading";
};

export const hideLoader = () => {
  loader.style.display = "none";
  loader.innerText = "";
};

export const showError = (msg: string, err?: any) => {
  if (import.meta.env.DEV) console.log(msg, err);
  console.log(msg, err);
  errorMsg.style.display = "flex";
  errorMsg.innerText = msg;
  setTimeout(() => {
    hideError();
  }, 3000);
};

export const hideError = () => {
  errorMsg.style.display = "none";
  errorMsg.innerText = "";
};

export const showSuccess = (msg: string) => {
  successMsg.style.display = "flex";
  successMsg.innerText = msg;
  setTimeout(() => {
    hideSuccess();
  }, 3000);
};

export const hideSuccess = () => {
  successMsg.style.display = "none";
  successMsg.innerText = "";
};
