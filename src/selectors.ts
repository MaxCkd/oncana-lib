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

// Get Checkboxes Wrapper
export const sideEffectWrapper = document.getElementById(
  "checkboxes-side-effect"
) as HTMLDivElement;
export const live = document.getElementById(
  "checkboxes-live"
) as HTMLDivElement;

// Image Input & Preview
export const imageInput = document.getElementById(
  "image-input"
) as HTMLInputElement;
export const imagePreview = document.getElementById(
  "image-preview"
) as HTMLImageElement;
