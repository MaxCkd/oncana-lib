const form = document.querySelector("#onboarding");
const loader = document.querySelector(".loader");
const errorMsg = document.querySelector(".error-msg");
const successMsg = document.querySelector(".success-msg");
const cancerType$1 = document.getElementById("select-cancer-type");
const cancerStage$1 = document.getElementById("select-cancer-stage");
const treatmentType$1 = document.getElementById("select-treatment-type");
const treatmentStage$1 = document.getElementById("select-treatment-stage");
const eat = document.getElementById("select-eat");
const move = document.getElementById("select-move");
const sideEffectWrapper = document.getElementById("checkboxes-side-effect");
const live = document.getElementById("checkboxes-live");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
var selector = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  form,
  loader,
  errorMsg,
  successMsg,
  cancerType: cancerType$1,
  cancerStage: cancerStage$1,
  treatmentType: treatmentType$1,
  treatmentStage: treatmentStage$1,
  eat,
  move,
  sideEffectWrapper,
  live,
  imageInput,
  imagePreview
});
const cancerType = document.getElementsByClassName("cancer-type-item");
const cancerStage = document.getElementsByClassName("cancer-stage-item");
const treatmentType = document.getElementsByClassName("treatment-type-item");
const treatmentStage = document.getElementsByClassName("treatment-stage-item");
const sideEffect = document.getElementsByClassName("side-effect-item");
const category = document.getElementsByClassName("category-item");
const showLoader = () => {
  hideError();
  hideSuccess();
  loader.style.display = "flex";
  loader.innerText = "Loading";
};
const hideLoader = () => {
  loader.style.display = "none";
  loader.innerText = "";
};
const showError = (msg, err) => {
  console.log(msg, err);
  errorMsg.style.display = "flex";
  errorMsg.innerText = msg;
  setTimeout(() => {
    hideError();
  }, 3e3);
};
const hideError = () => {
  errorMsg.style.display = "none";
  errorMsg.innerText = "";
};
const showSuccess = (msg) => {
  successMsg.style.display = "flex";
  successMsg.innerText = msg;
  setTimeout(() => {
    hideSuccess();
  }, 3e3);
};
const hideSuccess = () => {
  successMsg.style.display = "none";
  successMsg.innerText = "";
};
const addOption = (selector2, value, name) => {
  if (selector2 && value && name) {
    selector2.options.add(new Option(name, value));
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
    const name = el.children[0].innerText;
    const value = el.children[1].innerText;
    addOption(selector2, value, name);
  });
};
const mapCollectionCheckBox = (collection, wrapper, type) => {
  Object.values(collection).map((el) => {
    const name = el.children[0].innerText;
    const value = el.children[1].innerText;
    const checkBox = addCheckBox(value, name, type);
    wrapper.appendChild(checkBox);
  });
};
var createFields = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  addOption,
  addCheckBox,
  mapCollectionSelector,
  mapCollectionCheckBox
});
const multiSelect = (options) => options && Object.values(options).map((el) => el.selected && el.value).filter((el) => el);
const uniSelect = (options) => options && options[options.selectedIndex].value;
const multiCheckbox = (inputs) => Object.values(inputs).map((input) => input.checked && input.name).filter((i) => i);
const multiCheckboxFromEl = (inputs, type) => {
  return Array.from(inputs).filter((input) => input.checked && (type ? input.getAttribute("data-type") === type : 1)).map((input) => input.name).filter((i) => i);
};
var getFields = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  multiSelect,
  uniSelect,
  multiCheckbox,
  multiCheckboxFromEl
});
const mapUserFieldToBody = () => {
  var _a, _b, _c, _d, _e, _f;
  const elements = form.elements;
  const checkboxes = form.querySelectorAll(`input[type="checkbox"]`);
  const body = {
    "webflow-id": elements["webflow-id"].value,
    "first-name": elements["first-name"].value,
    "last-name": elements["last-name"].value,
    gender: uniSelect(elements["gender"].options) || "",
    dob: elements["dob"].value,
    postcode: elements["postcode"].value,
    "cancer-type": uniSelect((_a = elements["cancer-type"]) == null ? void 0 : _a.options) || "",
    "cancer-stage": uniSelect((_b = elements["cancer-stage"]) == null ? void 0 : _b.options) || "",
    "treatment-type": uniSelect((_c = elements["treatment-type"]) == null ? void 0 : _c.options) || "",
    "treatment-stage": uniSelect((_d = elements["treatment-stage"]) == null ? void 0 : _d.options) || "",
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect"),
    eat: uniSelect((_e = elements["eat"]) == null ? void 0 : _e.options) || "",
    move: uniSelect((_f = elements["move"]) == null ? void 0 : _f.options) || "",
    live: multiCheckboxFromEl(checkboxes, "live")
  };
  return body;
};
const mapProFieldToBody = () => {
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
  return body;
};
const api = "https://kj2a61qk36.execute-api.ap-southeast-2.amazonaws.com/dev";
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
var api$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  api,
  getUploadUrl,
  uploadToS3,
  updateUser
});
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
const previewImage = (imageInput2, imagePreview2) => {
  imageInput2.addEventListener("change", (event) => {
    imagePreview2.src = URL.createObjectURL(event.target.files[0]);
  });
  imagePreview2.addEventListener("load", () => {
    URL.revokeObjectURL(imagePreview2.src);
  });
};
var uploadImage$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  uploadImage,
  previewImage
});
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
const submitOnboardingForm = async (event) => {
  event.preventDefault();
  showLoader();
  try {
    const body = mapUserFieldToBody();
    const res = await updateUser(body);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    showSuccess("Success");
    const user = await res.json();
    window.location.replace(window.location.href + "/user/" + user.result.slug);
  } catch (err) {
    showError("Could not update your information", err);
  } finally {
    hideLoader();
  }
};
const submitProfessionalForm = async (event) => {
  var _a;
  event.preventDefault();
  showLoader();
  const elements = form.elements;
  const body = mapProFieldToBody();
  let errorImg = "";
  if (((_a = elements["pic"]) == null ? void 0 : _a.files) && elements["pic"].files[0]) {
    try {
      const file = elements["pic"].files[0];
      const uploadedImageUrl = await uploadImage(file);
      body.image = uploadedImageUrl;
    } catch (err) {
      errorImg = "Could not upload your image";
      console.log(errorImg, err);
    }
  }
  try {
    const res = await updateUser(body);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    showSuccess("Success");
  } catch (err) {
    showError("Could not update your information", err);
  } finally {
    hideLoader();
  }
};
export { api$1 as api, createFields as cf, createFieldsFromCollections, getFields as gf, selector, submitOnboardingForm, submitProfessionalForm, uploadImage$1 as upload };
