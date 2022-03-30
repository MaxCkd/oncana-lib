// Types
import { ProFormElements } from "./Types/type";
import bodymovin from "lottie-web";

// Imports
import * as selector from "./selectors";
import * as collection from "./collections";
import * as api from "./api";
import * as state from "./states";
import * as cf from "./createFields";
import * as upload from "./uploadImage";
import { mapProFieldToBody, mapUserFieldToBody } from "./updateForms";
import { getLocation } from "./googleMap";

// Exports
export * as selector from "./selectors";
export * as collection from "./collections";
export * as api from "./api";
export * as gf from "./getFields";
export * as cf from "./createFields";
export * as upload from "./uploadImage";
export { mapProFieldToBody, mapUserFieldToBody } from "./updateForms";
export { initMap, setLocation, setAutoComplete } from "./googleMap";

// Test Functions
export const createProFormFields = () => {
  cf.mapCollectionCheckBox(
    collection.lifestyle,
    selector.lifestyleWrapper,
    "lifestyle"
  );
  cf.mapCollectionCheckBox(
    collection.sideEffect,
    selector.sideEffectWrapper,
    "side-effect"
  );
  cf.mapCollectionSelector(collection.job, selector.job);
};

// Create fields for user form
export const createUserFormFields = () => {
  cf.mapCollectionSelector(collection.treatmentType, selector.treatmentType);
  cf.mapCollectionSelector(collection.treatmentStage, selector.treatmentStage);
  cf.mapCollectionSelector(collection.cancerType, selector.cancerType);
  cf.mapCollectionSelector(collection.cancerStage, selector.cancerStage);
  cf.mapCollectionCheckBox(
    collection.sideEffect,
    selector.sideEffectWrapper,
    "side-effect"
  );
  // For categories
  Object.values(collection.category).map((el: any) => {
    const name = el.children[0].innerText;
    const value = el.children[1].innerText;
    const type = el.children[2].innerText;
    switch (type) {
      case "Eat":
        cf.addOption(selector.eat, value, name);
        break;
      case "Move":
        cf.addOption(selector.move, value, name);
        break;
      case "Live":
        const liveBox = cf.addCheckBox(value, name, "live");
        selector.liveWrapper.appendChild(liveBox);
        break;
      default:
        break;
    }
  });
};

const validateUserForm = () => {
  if (!selector.firstName?.value) {
    state.showError("First Name is required");
    return false;
  }
  return true;
};

const validateProForm = (elements: ProFormElements) => {
  if (!selector.firstName?.value) {
    state.showError("A First Name is required");
    return false;
  }
  if (!selector.displayName?.value) {
    state.showError("A Display Name is required");
    return false;
  }
  if (!selector.jobTitle?.value) {
    state.showError("A Job title is required");
    return false;
  }
  if (!selector.bio?.value) {
    state.showError("A bio is required");
    return false;
  }
  if (!selector.address?.value) {
    state.showError("An Address is required");
    return false;
  }
  if (!selector.email?.value) {
    state.showError("An email is required");
    return false;
  }
  if (
    (!selector.imageInput?.files || !selector.imageInput?.files[0]) &&
    (!selector.imagePreview.src ||
      !selector.imagePreview.src.includes(window.location.href))
  ) {
    state.showError("An image is required");
    return false;
  }
  // Max size 500KB
  if (
    elements["picture"]?.files &&
    elements["picture"].files[0] &&
    elements["picture"].files[0].size > 5 * 10 ** 5
  ) {
    state.showError("The image is too big");
    return false;
  }
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (
    elements["picture"]?.files &&
    elements["picture"].files[0] &&
    !validTypes.includes(elements["picture"].files[0].type)
  ) {
    state.showError("The image type is invalid");
    return false;
  }
  return true;
};

export const submitUserForm = async (
  event: SubmitEvent,
  memberstackId?: string,
  webflowId?: string,
  redirect: boolean = false
) => {
  event.preventDefault();
  state.showLoader();
  state.disableButtons();
  try {
    // Validate
    const isValidated = validateUserForm();

    if (isValidated) {
      const body = mapUserFieldToBody();
      body["memberstack-id"] = memberstackId;
      body["webflow-id"] = webflowId;

      const res = await api.updateUser(body);
      if (!res.ok) {
        throw new Error("Network response was not OK");
      }
      state.showSuccess();
      const user = await res.json();
      redirect &&
        window.location.replace(
          window.location.origin + "/user/" + user.result.slug
        );
    }
  } catch (err) {
    state.showError("Could not update your information", err);
  } finally {
    state.hideLoader();
    state.enableButtons();
  }
};

export const submitProForm = async (
  event: SubmitEvent,
  memberstackId?: string,
  webflowId?: string,
  redirect: boolean = false,
  directoryId?: string
) => {
  event.preventDefault();
  state.showLoader();
  state.disableButtons();
  try {
    const elements = selector.proForm.elements as ProFormElements;

    // Validate
    let isValidated = validateProForm(elements);

    if (isValidated) {
      const body = mapProFieldToBody();
      body["memberstack-id"] = memberstackId;
      body["webflow-id"] = webflowId;

      // Image
      let errorImg = "";
      if (elements["picture"]?.files && elements["picture"].files[0]) {
        try {
          const file = elements["picture"].files[0];
          const uploadedImageUrl = await upload.uploadImage(file);
          body.image = uploadedImageUrl;
        } catch (err) {
          errorImg = "Could not upload your image";
          console.log(errorImg, err);
        }
      }

      // Address
      const loc = await getLocation();
      if (loc) {
        body["address"] = loc.address;
        body["longitude"] = loc.longitude;
        body["latitude"] = loc.latitude;
      }
      // Directory
      body["directory-id"] = directoryId;

      const res = await api.updatePro(body);
      if (!res.ok) {
        throw new Error("Network response was not OK");
      }
      state.showSuccess();
      const user = await res.json();
      redirect &&
        window.location.replace(
          window.location.origin + "/health-professional/" + user.result.slug
        );
    }
  } catch (err) {
    console.log("Err", err);
    state.showError("Could not update your information", err);
  } finally {
    state.hideLoader();
    state.enableButtons();
  }
};

export const populateUserFormDefaults = () => {
  const user = collection.getCurrentUser();
  cf.setDefaultInput(selector.firstName, user.firstName);
  cf.setDefaultInput(selector.lastName, user.lastName);
  cf.setDefaultInput(selector.phone, user.phone);
  cf.setDefaultInput(selector.email, user.email);

  // For select
  cf.setDefaultOption(selector.gender, user.gender);
  cf.setDefaultOption(selector.cancerType, user.cancerType);
  cf.setDefaultOption(selector.cancerStage, user.cancerStage);
  // cf.setDefaultOption(selector.treatmentType, pro.job);
  // cf.setDefaultOption(selector.treatmentStage, pro.job);

  // For checkboxes
  cf.setDefaultCheckboxes(
    selector.sideEffectWrapper,
    user["selected-side-effects"].split(",")
  );
};

export const populateProFormDefaults = () => {
  const pro = collection.getCurrentPro();
  cf.setDefaultInput(selector.firstName, pro.firstName);
  cf.setDefaultInput(selector.lastName, pro.lastName);
  cf.setDefaultInput(selector.displayName, pro.displayName);
  cf.setDefaultInput(selector.address, pro.address);
  cf.setDefaultInput(selector.bio, pro.bio);
  cf.setDefaultInput(selector.phone, pro.phone);
  cf.setDefaultInput(selector.email, pro.email);
  // cf.setDefaultInput(selector.postCode, pro.postCode);
  cf.setDefaultInput(selector.website, pro.website);
  cf.setDefaultInput(selector.jobTitle, pro.jobTitle);

  // For select
  cf.setDefaultOption(selector.job, pro.job);

  // For checkboxes
  cf.setDefaultCheckboxes(
    selector.lifestyleWrapper,
    pro["selected-lifestyles"].split(",")
  );
  cf.setDefaultCheckboxes(
    selector.sideEffectWrapper,
    pro["selected-side-effects"].split(",")
  );

  // For the image
  selector.imagePreview.src = pro.image;
};

// const removeClass = (element: HTMLDivElement, className: string) => {
//   if (element.classList.contains(className)) {
//     element.classList.remove(className);
//   }
// };

// const addClass = (element: HTMLDivElement, className: string) => {
//   if (!element.classList.contains(className)) {
//     element.classList.add(className);
//   }
// };

// const selectedTag = "tag-selected";
// const tags = document.getElementsByClassName("tag-search");
// Array.from(tags).forEach((el) => {
//   const input = el.querySelector(".tag-input") as HTMLInputElement
//   el.addEventListener("click", () => {
//     if(input?.checked) {
//       el.classList.add(selectedTag);
//     } else {
//       el.classList.remove(selectedTag);
//     }
//   });
// });

export const createLoader = () => {
  const logoPath =
    "https://uploads-ssl.webflow.com/61f11d8292ee6b2daed585b7/61f18670b36bc454452d21c1_Logo_Mist%20Green.png";
  const animPath =
    "https://uploads-ssl.webflow.com/61f11d8292ee6b2daed585b7/620fc74043da69740f43094a_loader.json";

  const loader = document.createElement("div");
  loader.className = "loader";
  loader.style.display = "none";
  loader.style.flex = "1 0";
  loader.style.flexDirection = "column";
  loader.style.alignItems = "center";
  loader.style.justifyContent = "center";
  loader.style.zIndex = "9999";
  loader.style.minHeight = "100%";
  loader.style.position = "fixed";
  loader.style.top = "0%";
  loader.style.bottom = "0%";
  loader.style.right = "0%";
  loader.style.left = "0%";
  loader.style.backgroundColor = "#e9dfd3";

  const img = document.createElement("img");
  img.src = logoPath;
  img.style.width = "800px";

  const txt = document.createElement("span");
  txt.className = "text";
  txt.textContent = "Updating your profile...";

  const lottieContainer = document.createElement("div");
  lottieContainer.style.width = "200px";

  loader.appendChild(img);
  loader.appendChild(txt);
  loader.appendChild(lottieContainer);

  document.body.appendChild(loader);

  const animation = bodymovin.loadAnimation({
    container: lottieContainer, // Required
    path: animPath, // Required
    renderer: "svg", // Required
    loop: true, // Optional
    autoplay: true, // Optional
    name: "Hello World", // Name for future reference. Optional.
  });

  animation.play();
};
