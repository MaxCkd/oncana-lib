export const addOption = (
  selector: HTMLSelectElement,
  value: string,
  name: string
) => {
  if (selector && value && name) {
    selector.options.add(new Option(name, value));
  }
};

export const addCheckBox = (value: string, label: string, type: string) => {
  const domLabel = document.createElement(`label`);
  const input = document.createElement(`input`);
  input.type = "checkbox";
  input.name = value;
  input.setAttribute("data-type", type);
  const checkmark = document.createElement(`span`);
  checkmark.className = "checkmark";
  const text = document.createElement(`span`);
  text.className = "checktext";
  text.innerText = label;
  domLabel.appendChild(input);
  domLabel.appendChild(checkmark);
  domLabel.appendChild(text);
  return domLabel;
};

export const mapCollectionSelector = (
  collection: HTMLCollectionOf<any>,
  selector: HTMLSelectElement
) => {
  Object.values(collection).map((el) => {
    const name = el.children[0].innerText;
    const value = el.children[1].innerText;
    addOption(selector, value, name);
  });
};

export const mapCollectionCheckBox = (
  collection: HTMLCollectionOf<any>,
  wrapper: HTMLDivElement,
  type: string
) => {
  Object.values(collection).map((el) => {
    const name = el.children[0].innerText;
    const value = el.children[1].innerText;
    const checkBox = addCheckBox(value, name, type);
    wrapper.appendChild(checkBox);
  });
};

export const setDefaultInput = (input: HTMLInputElement, value: string) => {
  if (input && value) {
    input.defaultValue = value;
  }
};

export const setDefaultCheckboxes = (
  wrapper: HTMLDivElement,
  checked: string[]
) => {
  const checkboxes = Array.from(wrapper.getElementsByTagName("input"));
  checkboxes.forEach((cb) => {
    if (checked.includes(cb.name)) {
      cb.checked = true;
    }
  });
};

export const setDefaultOption = (select: HTMLSelectElement, value: string) => {
  const selectedIdx = Array.from(select.options)
    .map((i) => i.value)
    .indexOf(value);
  // const selectedIdx = select.options.namedItem(value)?.index;
  if (selectedIdx) {
    select.options.selectedIndex = selectedIdx;
  }
};
