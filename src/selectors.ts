export const form = document.querySelector<HTMLFormElement>(
  "#onboarding"
) as HTMLFormElement;

// Form States Display
export const loader = document.querySelector(".loader") as HTMLDivElement;
export const errorMsg = document.querySelector(".error-msg") as HTMLDivElement;
export const successMsg = document.querySelector(
  ".success-msg"
) as HTMLDivElement;

// Get Selects inputs
export const cancerType = document.getElementById(
  "select-cancer-type"
) as HTMLSelectElement;
export const cancerStage = document.getElementById(
  "select-cancer-stage"
) as HTMLSelectElement;
export const treatmentType = document.getElementById(
  "select-treatment-type"
) as HTMLSelectElement;
export const treatmentStage = document.getElementById(
  "select-treatment-stage"
) as HTMLSelectElement;
export const eat = document.getElementById("select-eat") as HTMLSelectElement;
export const move = document.getElementById("select-move") as HTMLSelectElement;
export const job = document.getElementById("select-job") as HTMLSelectElement;

// Get Checkboxes Wrapper
export const sideEffectWrapper = document.getElementById(
  "checkboxes-side-effects"
) as HTMLDivElement;
export const live = document.getElementById(
  "checkboxes-lives"
) as HTMLDivElement;
export const lifestyleWrapper = document.getElementById(
  "checkboxes-lifestyles"
) as HTMLDivElement;
export const categoryWrapper = document.getElementById(
  "checkboxes-categories"
) as HTMLDivElement;

// Image Input & Preview
export const imageInput = document.getElementById(
  "image-input"
) as HTMLInputElement;
export const imagePreview = document.getElementById(
  "image-preview"
) as HTMLImageElement;
export const imageUpload = document.getElementById(
  "image-upload"
) as HTMLLabelElement;
export const imageFeedback = document.getElementById(
  "image-feedback"
) as HTMLImageElement;

// Inputs
export const firstName = document.getElementById(
  "first-name"
) as HTMLInputElement;
export const bio = document.getElementById("bio") as HTMLInputElement;
export const lastName = document.getElementById(
  "last-name"
) as HTMLInputElement;
export const phone = document.getElementById("phone") as HTMLInputElement;
export const jobTitle = document.getElementById(
  "job-title"
) as HTMLInputElement;
export const oncanaCategories = document.getElementById(
  "oncana-categories"
) as HTMLInputElement;
