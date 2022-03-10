import { form } from "./selectors";
import { multiCheckboxFromEl, uniSelect } from "./getFields";
import type { OnboardingFormElements, OncanaUser } from "./Types/type";

export const mapUserFieldToBody = () => {
  const elements = form.elements as OnboardingFormElements;

  const checkboxes = form.querySelectorAll(
    `input[type="checkbox"]`
  ) as NodeListOf<HTMLInputElement>;

  const body: Partial<OncanaUser> = {
    "first-name": elements["first-name"]?.value || "",
    "last-name": elements["last-name"]?.value || "",
    gender: uniSelect(elements["gender"].options) || "",
    dob: elements["dob"]?.value || "",
    postcode: elements["postcode"]?.value || "",
    "cancer-type": uniSelect(elements["cancer-type"]?.options) || "",
    "cancer-stage": uniSelect(elements["cancer-stage"]?.options) || "",
    "treatment-type": uniSelect(elements["treatment-type"]?.options) || "",
    "treatment-stage": uniSelect(elements["treatment-stage"]?.options) || "",
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect"),
    eat: uniSelect(elements["eat"]?.options) || "",
    move: uniSelect(elements["move"]?.options) || "",
    live: multiCheckboxFromEl(checkboxes, "live"),
  };

  return body;
};

export const mapProFieldToBody = () => {
  const elements = form.elements as OnboardingFormElements;

  const checkboxes = form.querySelectorAll(
    `input[type="checkbox"]`
  ) as NodeListOf<HTMLInputElement>;

  const body: Partial<OncanaUser> = {
    "first-name": elements["first-name"].value,
    "last-name": elements["last-name"].value,
    dob: elements["dob"].value,
    gender: uniSelect(elements["gender"].options),
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect"),
  };

  return body;
};
