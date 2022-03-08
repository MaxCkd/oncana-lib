import "./Styles/style.css";
import "./Styles/checkbox.css";
import "./Styles/select.css";
import * as selector from "./selector";
import { submitOnboardingForm } from "./onboardingForm";
import { createFieldsFromCollections } from "./createFields";

export { selector, submitOnboardingForm, createFieldsFromCollections };

createFieldsFromCollections();
selector.form.addEventListener("submit", submitOnboardingForm);
