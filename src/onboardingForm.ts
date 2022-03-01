import { updateUser } from "./api";
import { uploadImage } from "./uploadImage";
import { loader, checkBoxeSe, form } from "./selector";
import { multiCheckbox, multiSelect, uniSelect } from "./utils";
import type { OnboardingFormElements, WebflowUser } from "./type";

export const submitForm = async (event: SubmitEvent) => {
  event.preventDefault();

  // Show Loader
  if (loader) loader.style.display = "fixed";

  const elements = form.elements as OnboardingFormElements;

  const body: Partial<WebflowUser> = {
    "webflow-id": elements["webflow-id"].value,
    "first-name": elements["first-name"].value,
    "last-name": elements["last-name"].value,
    dob: elements["dob"].value,
    gender: uniSelect(elements["gender"].options),
    "side-effects": multiSelect(elements["side-effect"].options),
  };

  if (elements["pic"].files) {
    try {
      const file = elements["pic"].files[0];
      const uploadedImageUrl = await uploadImage(file);
      console.log("Image", uploadedImageUrl);

      body.image = uploadedImageUrl;
    } catch (err) {
      console.log(err);
      // Display error for picture
    }
  }

  try {
    const res = await updateUser(body);
    if (res.ok) {
      // Show success
      console.log("Success");
    }
  } catch (err) {
    console.log(err);
    // Display error for update
  } finally {
    // Hide Loader
    if (loader) loader.style.display = "fixed";
  }
};
