import { updateUser } from "./api";
import { uploadImage } from "./uploadImage";
import { loader, form } from "./selectors";
import { multiCheckboxFromEl, uniSelect } from "./getFields";
import type { OnboardingFormElements, WebflowUser } from "./Types/type";

export const submitOnboardingForm = async (event: SubmitEvent) => {
  event.preventDefault();

  // Show Loader
  if (loader) loader.style.display = "fixed";

  const elements = form.elements as OnboardingFormElements;
  const checkboxes = form.querySelectorAll(
    `input[type="checkbox"]`
  ) as NodeListOf<HTMLInputElement>;

  const body: Partial<WebflowUser> = {
    "webflow-id": elements["webflow-id"].value,
    "first-name": elements["first-name"].value,
    "last-name": elements["last-name"].value,
    dob: elements["dob"].value,
    gender: uniSelect(elements["gender"].options),
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect"),
  };

  if (elements["pic"].files && elements["pic"].files[0]) {
    try {
      const file = elements["pic"].files[0];
      const uploadedImageUrl = await uploadImage(file);
      console.log("Image", uploadedImageUrl);

      body.image = uploadedImageUrl;
    } catch (err) {
      // Display error for picture
      console.log(err);
    }
  }

  try {
    const res = await updateUser(body);
    if (!res.ok) {
      // Show Error
      console.log("Error");
      throw new Error("Network response was not OK");
    }
    // Show success
    console.log("Success");
  } catch (err) {
    // Display error for update
    console.log(err);
  } finally {
    // Hide Loader
    if (loader) loader.style.display = "fixed";
  }
};
