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
