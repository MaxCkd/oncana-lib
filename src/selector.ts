export const loader = document.querySelector(".loader") as HTMLDivElement;

export const form = document.querySelector<HTMLFormElement>(
  "#onboarding"
) as HTMLFormElement;

export const inputFirstName = form.querySelector(
  'input[name="first-name"]'
) as HTMLInputElement;

export const multiCheckBox = form.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;

export const settings = document.querySelector<HTMLDivElement>(".settings");
export const btnSettings =
  document.querySelector<HTMLDivElement>(".btn-settings");
