var style = "";
var checkbox = "";
var select = "";
const loader = document.querySelector(".loader");
const form = document.querySelector("#onboarding");
const inputFirstName = form.querySelector('input[name="first-name"]');
const multiCheckBox = form.querySelectorAll('input[type="checkbox"]');
const settings = document.querySelector(".settings");
const btnSettings = document.querySelector(".btn-settings");
var selector = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  loader,
  form,
  inputFirstName,
  multiCheckBox,
  settings,
  btnSettings
});
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
const cancerTypeSelector = document.getElementById("select-cancer-type");
const cancerStageSelector = document.getElementById("select-cancer-stage");
const treatmentTypeSelector = document.getElementById("select-treatment-type");
const treatmentStageSelector = document.getElementById("select-treatment-stage");
const eatSelector = document.getElementById("select-eat");
const moveSelector = document.getElementById("select-move");
const sideEffectWrapper = document.getElementById("checkboxes-side-effect");
const liveSelector = document.getElementById("checkboxes-live");
const cancerTypeCollection = document.getElementsByClassName("cancer-type-item");
const cancerStageCollection = document.getElementsByClassName("cancer-stage-item");
const treatmentTypeCollection = document.getElementsByClassName("treatment-type-item");
const treatmentStageCollection = document.getElementsByClassName("treatment-stage-item");
const sideEffectCollection = document.getElementsByClassName("side-effect-item");
const categoryCollection = document.getElementsByClassName("category-item");
const addOption = (selector2, value, name) => {
  if (value && name) {
    selector2.options.add(new Option(value, name));
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
const mapCollectionSelector = (collection, selector2) => {
  Object.values(collection).map((el) => {
    addOption(selector2, el.children[0].innerText, el.children[1].innerText);
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
  mapCollectionSelector(treatmentTypeCollection, treatmentTypeSelector);
  mapCollectionSelector(treatmentStageCollection, treatmentStageSelector);
  mapCollectionSelector(cancerTypeCollection, cancerTypeSelector);
  mapCollectionSelector(cancerStageCollection, cancerStageSelector);
  mapCollectionCheckBox(sideEffectCollection, sideEffectWrapper, "side-effect");
  Object.values(categoryCollection).map((el) => {
    const type = el.children[2].innerText;
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    switch (type) {
      case "Eat":
        addOption(eatSelector, value, name);
        break;
      case "Move":
        addOption(moveSelector, value, name);
        break;
      case "Live":
        const liveBox = addCheckBox(value, name, "live");
        liveSelector.appendChild(liveBox);
        break;
    }
  });
};
createFieldsFromCollections();
form.addEventListener("submit", submitOnboardingForm);
export { createFieldsFromCollections, selector, submitOnboardingForm };
