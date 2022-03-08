import "./Styles/style.css";
import "./Styles/Checkbox.css";
import "./Styles/Select.css";
import * as selector from "./selector";
import { submitOnboardingForm } from "./onboardingForm";
import { createFieldsFromCollections } from "./createFields";

export {
  selector,
  submitOnboardingForm,
  createFieldsFromCollections as createSelectFromCollections,
};

createFieldsFromCollections();
selector.form.addEventListener("submit", submitOnboardingForm);
