export const loader = document.querySelector(".loader") as HTMLDivElement;

export const form = document.querySelector<HTMLFormElement>(
  "#onboarding"
) as HTMLFormElement;

export const inputFirstName = form.querySelector(
  'input[name="first-name"]'
) as HTMLInputElement;

export const checkBoxeSe = form.querySelectorAll(
  'input[type="checkbox"]'
) as NodeListOf<HTMLInputElement>;
