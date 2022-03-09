import * as selector from "./selectors";
import * as collection from "./collections";
import * as state from "./states";
import {
  mapCollectionSelector,
  mapCollectionCheckBox,
  addOption,
  addCheckBox,
} from "./createFields";
import { mapProFieldToBody, mapUserFieldToBody } from "./onboardingForm";
import { uploadImage } from "./uploadImage";
import { updateUser } from "./api";
import { OnboardingFormElements } from "./Types/type";

// Exports
export * as gf from "./getFields";
export * as cf from "./createFields";
export * as api from "./api";
export * as upload from "./uploadImage";
export * as selector from "./selectors";

export { mapUserFieldToBody } from "./onboardingForm";

export const createFieldsFromCollections = () => {
  mapCollectionSelector(collection.treatmentType, selector.treatmentType);
  mapCollectionSelector(collection.treatmentStage, selector.treatmentStage);
  mapCollectionSelector(collection.cancerType, selector.cancerType);
  mapCollectionSelector(collection.cancerStage, selector.cancerStage);
  mapCollectionCheckBox(
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
        addOption(selector.eat, value, name);
        break;
      case "Move":
        addOption(selector.move, value, name);
        break;
      case "Live":
        const liveBox = addCheckBox(value, name, "live");
        selector.live.appendChild(liveBox);
        break;
      default:
        break;
    }
  });
};

export const submitOnboardingForm = async (event: SubmitEvent) => {
  event.preventDefault();
  state.showLoader();

  try {
    const body = mapUserFieldToBody();
    const res = await updateUser(body);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    state.showSuccess("Success");
    const user = await res.json();
    window.location.replace(window.location.href + "/user/" + user.result.slug);
  } catch (err) {
    state.showError("Could not update your information", err);
  } finally {
    state.hideLoader();
  }
};

export const submitProfessionalForm = async (event: SubmitEvent) => {
  event.preventDefault();

  state.showLoader();

  const elements = selector.form.elements as OnboardingFormElements;
  const body = mapProFieldToBody();

  let errorImg = "";
  if (elements["pic"]?.files && elements["pic"].files[0]) {
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
    state.showSuccess("Success");
  } catch (err) {
    state.showError("Could not update your information", err);
  } finally {
    state.hideLoader();
  }
};
