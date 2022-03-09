import { form } from "./selectors";
import { multiCheckboxFromEl, uniSelect } from "./getFields";
import type { OnboardingFormElements, WebflowUser } from "./Types/type";

export const mapUserFieldToBody = () => {
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

  return body;
};

export const mapProFieldToBody = () => {
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

  return body;
};
