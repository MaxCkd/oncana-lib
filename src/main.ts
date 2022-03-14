// Types
import { ProFormElements } from "./Types/type";

// Imports
import * as selector from "./selectors";
import * as collection from "./collections";
import * as api from "./api";
import * as state from "./states";
import * as cf from "./createFields";
import * as upload from "./uploadImage";
import { mapProFieldToBody, mapUserFieldToBody } from "./updateForms";

// Exports
export * as selector from "./selectors";
export * as collection from "./collections";
export * as api from "./api";
export * as gf from "./getFields";
export * as cf from "./createFields";
export * as upload from "./uploadImage";
export { mapProFieldToBody, mapUserFieldToBody } from "./updateForms";

// Test Functions
export const createProFormFields = () => {
  cf.mapCollectionCheckBox(
    collection.lifestyle,
    selector.lifestyleWrapper,
    "lifestyle"
  );
  console.log("Create");

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

export const submitUserForm = async (event: SubmitEvent) => {
  event.preventDefault();
  state.showLoader();
  try {
    const body = mapUserFieldToBody();
    // let memberstackId = "6229092f36ca830004d459b4";
    // body["memberstack-id"] = memberstackId;
    let webflowId = "620f78370eeeb2cc10a23e94";
    body["webflow-id"] = webflowId;

    const res = await api.updateUser(body);
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

export const submitProForm = async (
  event: SubmitEvent,
  memberstackId?: string,
  webflowId?: string,
  redirect: boolean = false
) => {
  event.preventDefault();
  state.showLoader();
  state.disableButtons();
  try {
    const body = mapProFieldToBody();
    body["memberstack-id"] = memberstackId;
    body["webflow-id"] = webflowId;

    console.log("MMM", memberstackId);

    const elements = selector.proForm.elements as ProFormElements;
    let errorImg = "";
    if (elements["picture"]?.files && elements["picture"].files[0]) {
      try {
        const file = elements["picture"].files[0];
        const uploadedImageUrl = await upload.uploadImage(file);
        console.log("Image Url", uploadedImageUrl);

        body.image = uploadedImageUrl;
      } catch (err) {
        errorImg = "Could not upload your image";
        console.log(errorImg, err);
      }
    }

    const res = await api.updatePro(body);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    state.showSuccess();
    const user = await res.json();
    redirect &&
      window.location.replace(
        window.location.href + "/health-professional/" + user.result.slug
      );
  } catch (err) {
    state.showError("Could not update your information", err);
  } finally {
    state.hideLoader();
    state.enableButtons();
  }
};

export const populateProFormDefaults = () => {
  const pro = collection.getCurrentPro();
  cf.setDefaultInput(selector.firstName, pro.firstName);
  cf.setDefaultInput(selector.lastName, pro.lastName);
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
    selector.lifestyleWrapper,
    pro["selected-side-effects"].split(",")
  );

  // For the image
  selector.imagePreview.src = pro.image;
};

// let memberstackId = "6229092f36ca830004d459b4";
// let webflowId = "6213eae0fae77e75cf3dc004";
// selector.proForm.addEventListener("submit", (e) =>
//   submitProForm(e, memberstackId, webflowId)
// );

// proForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//    try {
//      const body = oncana.mapProFieldToBody();
//      body["webflow-id"] = webflowId;
//      body["memberstack-id"] = memberstackId;
//      const elements = proForm.elements;

//      let errorImg = "";
//      if (elements["picture"].files && elements["picture"].files[0]) {
//        try {
//          const file = elements["picture"].files[0];
//          const uploadedImageUrl = await upload.uploadImage(file);
//          console.log("Image Url", uploadedImageUrl);

//          body.image = uploadedImageUrl;
//          } catch (err) {
//              errorImg = "Could not upload your image";
//              console.log(errorImg, err);
//            }
//        }

//      const res = await api.updatePro(body);
//      if (!res.ok) {
//        throw new Error("Network response was not OK");
//      }
//      const user = await res.json();
//      console.log("Updated user", user);
//    } catch(err) {
//      console.log("Error", err)
//    }
//  })
