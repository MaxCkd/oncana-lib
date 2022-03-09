export const multiSelect = (options: HTMLOptionsCollection) =>
  Object.values(options)
    .map((el) => el.selected && el.value)
    .filter((el) => el) as string[];

export const uniSelect = (options: HTMLOptionsCollection) =>
  options[options.selectedIndex].value;

export const multiCheckbox = (inputs: NodeListOf<HTMLInputElement>) =>
  Object.values(inputs)
    .map((input) => input.checked && input.name)
    .filter((i) => i) as string[];

export const multiCheckboxFromEl = (
  inputs: NodeListOf<HTMLInputElement>,
  type?: string
) => {
  return Array.from(inputs)
    .filter(
      (input) =>
        input.checked && (type ? input.getAttribute("data-type") === type : 1)
    )
    .map((input) => input.name)
    .filter((i) => i) as string[];
};
