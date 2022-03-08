export const addOption = (
  selector: HTMLSelectElement,
  value: string,
  name: string
) => {
  if (value && name) {
    selector.options.add(new Option(value, name));
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
    addOption(selector, el.children[0].innerText, el.children[1].innerText);
  });
};

export const mapCollectionCheckBox = (
  collection: HTMLCollectionOf<any>,
  wrapper: HTMLDivElement,
  type: string
) => {
  Object.values(collection).map((el) => {
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    const checkBox = addCheckBox(value, name, type);
    wrapper.appendChild(checkBox);
  });
};
