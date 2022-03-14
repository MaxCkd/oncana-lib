import { loader, successMsg, errorMsg } from "./selectors";

export const showLoader = (text?: string) => {
  hideError();
  hideSuccess();
  loader.style.display = "flex";
  if (text) {
    const innerDiv = loader.getElementsByTagName("div")[0];
    innerDiv.innerText = text;
  }
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
};

export const showSuccess = (msg?: string) => {
  successMsg.style.display = "flex";
  if (msg) {
    const innerDiv = successMsg.getElementsByTagName("div")[0];
    innerDiv.innerText = msg;
  }
  setTimeout(() => {
    hideSuccess();
  }, 3000);
};

export const hideSuccess = () => {
  successMsg.style.display = "none";
};

export const disableButtons = () => {
  const buttons = document.getElementsByTagName("button");
  for (let button of Array.from(buttons)) {
    button.disabled = true;
  }
};

export const enableButtons = () => {
  const buttons = document.getElementsByTagName("button");
  for (let button of Array.from(buttons)) {
    button.disabled = false;
  }
};
