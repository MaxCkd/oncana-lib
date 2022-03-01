import "./style.css";
import * as selector from "./selector";
import * as onboarding from "./onboardingForm";

// if (process.env.NODE_ENV !== "production") {
//   console.log("Looks like we are in development mode!");
// }

export { selector, onboarding };

selector.form.addEventListener("submit", onboarding.submitForm);

// try {
// const collections = await getCollectionsForm();
// populateSelectFields(collections.result);
// } catch (e) {
//   console.log("Error", e);
// }
