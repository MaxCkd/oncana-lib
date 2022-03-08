const loader = document.querySelector(".loader");
const form = document.querySelector("#onboarding");
const cancerType$1 = document.getElementById("select-cancer-type");
const cancerStage$1 = document.getElementById("select-cancer-stage");
const treatmentType$1 = document.getElementById("select-treatment-type");
const treatmentStage$1 = document.getElementById("select-treatment-stage");
const eat = document.getElementById("select-eat");
const move = document.getElementById("select-move");
const sideEffectWrapper = document.getElementById("checkboxes-side-effect");
const live = document.getElementById("checkboxes-live");
var selectors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  loader,
  form,
  cancerType: cancerType$1,
  cancerStage: cancerStage$1,
  treatmentType: treatmentType$1,
  treatmentStage: treatmentStage$1,
  eat,
  move,
  sideEffectWrapper,
  live
});
const cancerType = document.getElementsByClassName("cancer-type-item");
const cancerStage = document.getElementsByClassName("cancer-stage-item");
const treatmentType = document.getElementsByClassName("treatment-type-item");
const treatmentStage = document.getElementsByClassName("treatment-stage-item");
const sideEffect = document.getElementsByClassName("side-effect-item");
const category = document.getElementsByClassName("category-item");
const api = {}.API;
const update = api + "/webflow";
const getPresignedUrl = api + "/get-presigned-url";
const headers = {
  "Content-Type": "application/json",
  Accept: "*"
};
const getUploadUrl = (filename, filetype) => {
  return fetch(getPresignedUrl, {
    method: "POST",
    body: JSON.stringify({
      filename,
      filetype
    })
  });
};
const uploadToS3 = (url, blob) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "*",
      "Content-Type": "image/png"
    },
    body: blob
  });
};
const updateUser = (body) => {
  return fetch(update, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body)
  });
};
const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
const uploadImage = async (file) => {
  const [blob, responseUrlUpload] = await Promise.all([
    fileToBlob(file),
    getUploadUrl(file.name, file.type)
  ]);
  if (!responseUrlUpload.ok)
    throw new Error("Could not get url upload");
  const { uploadUrl } = await responseUrlUpload.json();
  const responseUpload = await uploadToS3(uploadUrl, blob);
  if (!responseUpload.ok)
    throw new Error("Could not upload the image");
  return responseUpload.url;
};
const uniSelect = (options) => options[options.selectedIndex].value;
const multiCheckboxFromEl = (inputs, type) => {
  return Array.from(inputs).filter((input) => input.checked && (type ? input.getAttribute("data-type") === type : 1)).map((input) => input.name).filter((i) => i);
};
const submitOnboardingForm = async (event) => {
  event.preventDefault();
  if (loader)
    loader.style.display = "fixed";
  const elements = form.elements;
  const checkboxes = form.querySelectorAll(`input[type="checkbox"]`);
  const body = {
    "webflow-id": elements["webflow-id"].value,
    "first-name": elements["first-name"].value,
    "last-name": elements["last-name"].value,
    dob: elements["dob"].value,
    gender: uniSelect(elements["gender"].options),
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect")
  };
  if (elements["pic"].files && elements["pic"].files[0]) {
    try {
      const file = elements["pic"].files[0];
      const uploadedImageUrl = await uploadImage(file);
      console.log("Image", uploadedImageUrl);
      body.image = uploadedImageUrl;
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const res = await updateUser(body);
    if (!res.ok) {
      console.log("Error");
      throw new Error("Network response was not OK");
    }
    console.log("Success");
  } catch (err) {
    console.log(err);
  } finally {
    if (loader)
      loader.style.display = "fixed";
  }
};
const addOption = (selector, value, name) => {
  if (value && name) {
    selector.options.add(new Option(value, name));
  }
};
const addCheckBox = (value, label, type) => {
  const domLabel = document.createElement(`label`);
  const input = document.createElement(`input`);
  input.type = "checkbox";
  input.name = value;
  input.setAttribute("data-type", type);
  const checkmark = document.createElement(`span`);
  checkmark.className = "checkmark";
  const text = document.createElement(`span`);
  text.className = "checktext";
  text.innerText = label;
  domLabel.appendChild(input);
  domLabel.appendChild(checkmark);
  domLabel.appendChild(text);
  return domLabel;
};
const mapCollectionSelector = (collection, selector) => {
  Object.values(collection).map((el) => {
    addOption(selector, el.children[0].innerText, el.children[1].innerText);
  });
};
const mapCollectionCheckBox = (collection, wrapper, type) => {
  Object.values(collection).map((el) => {
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    const checkBox = addCheckBox(value, name, type);
    wrapper.appendChild(checkBox);
  });
};
const createFieldsFromCollections = () => {
  mapCollectionSelector(treatmentType, treatmentType$1);
  mapCollectionSelector(treatmentStage, treatmentStage$1);
  mapCollectionSelector(cancerType, cancerType$1);
  mapCollectionSelector(cancerStage, cancerStage$1);
  mapCollectionCheckBox(sideEffect, sideEffectWrapper, "side-effect");
  Object.values(category).map((el) => {
    const type = el.children[2].innerText;
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    switch (type) {
      case "Eat":
        addOption(eat, value, name);
        break;
      case "Move":
        addOption(move, value, name);
        break;
      case "Live":
        const liveBox = addCheckBox(value, name, "live");
        live.appendChild(liveBox);
        break;
    }
  });
};
export { createFieldsFromCollections, selectors as selector, submitOnboardingForm };
