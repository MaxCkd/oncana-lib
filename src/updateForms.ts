import { userForm, proForm } from "./selectors";
import { multiCheckboxFromEl, uniSelect } from "./getFields";
import type {
  UserFormElements,
  UpdateUserData,
  UpdateProData,
  ProFormElements,
} from "./Types/type";

type UserBody = Omit<UpdateUserData, "memberstack-id" | "webflow-id" | "email">;
export const mapUserFieldToBody = (): Partial<UpdateUserData> => {
  const elements = userForm.elements as UserFormElements;

  const checkboxes = userForm.querySelectorAll(
    `input[type="checkbox"]`
  ) as NodeListOf<HTMLInputElement>;

  const body: UserBody = {
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

type ProBody = Omit<
  UpdateProData,
  "memberstack-id" | "webflow-id" | "image" | "address"
>;

export const mapProFieldToBody = (): Partial<UpdateProData> => {
  const elements = proForm.elements as ProFormElements;

  const checkboxes = proForm.querySelectorAll(
    `input[type="checkbox"]`
  ) as NodeListOf<HTMLInputElement>;

  const body: ProBody = {
    "first-name": elements["first-name"]?.value || "",
    "display-name": elements["display-name"]?.value || "",
    "last-name": elements["last-name"]?.value || "",
    bio: elements["bio"]?.value || "",
    email: elements["email"]?.value || "",
    job: uniSelect(elements["job"]?.options) || "",
    "job-title": elements["job-title"]?.value || "",
    phone: elements["phone"]?.value || "",
    website: elements["website"]?.value || "",
    "side-effects": multiCheckboxFromEl(checkboxes, "side-effect"),
    lifestyles: multiCheckboxFromEl(checkboxes, "lifestyle"),
  };

  return body;
};
