// Get Selectors
const cancerTypeSelector = document.getElementById(
  "select-cancer-type"
) as HTMLSelectElement;
const cancerStageSelector = document.getElementById(
  "select-cancer-stage"
) as HTMLSelectElement;
const treatmentTypeSelector = document.getElementById(
  "select-treatment-type"
) as HTMLSelectElement;
const treatmentStageSelector = document.getElementById(
  "select-treatment-stage"
) as HTMLSelectElement;
const eatSelector = document.getElementById("select-eat") as HTMLSelectElement;
const moveSelector = document.getElementById(
  "select-move"
) as HTMLSelectElement;

// Get Checkboxes Wrapper
const sideEffectWrapper = document.getElementById(
  "checkboxes-side-effect"
) as HTMLDivElement;
const liveSelector = document.getElementById(
  "checkboxes-live"
) as HTMLSelectElement;

// Get Collections
const cancerTypeCollection =
  document.getElementsByClassName("cancer-type-item");
const cancerStageCollection =
  document.getElementsByClassName("cancer-stage-item");
const treatmentTypeCollection = document.getElementsByClassName(
  "treatment-type-item"
);
const treatmentStageCollection = document.getElementsByClassName(
  "treatment-stage-item"
);
const sideEffectCollection =
  document.getElementsByClassName("side-effect-item");
const categoryCollection = document.getElementsByClassName("category-item");

const addOption = (
  selector: HTMLSelectElement,
  value: string,
  name: string
) => {
  if (value && name) {
    selector.options.add(new Option(value, name));
  }
};

const addCheckBox = (value: string, label: string, type: string) => {
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

const mapCollectionSelector = (
  collection: HTMLCollectionOf<any>,
  selector: HTMLSelectElement
) => {
  Object.values(collection).map((el) => {
    addOption(selector, el.children[0].innerText, el.children[1].innerText);
  });
};

const mapCollectionCheckBox = (
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

export const createFieldsFromCollections = () => {
  mapCollectionSelector(treatmentTypeCollection, treatmentTypeSelector);
  mapCollectionSelector(treatmentStageCollection, treatmentStageSelector);
  mapCollectionSelector(cancerTypeCollection, cancerTypeSelector);
  mapCollectionSelector(cancerStageCollection, cancerStageSelector);
  mapCollectionCheckBox(sideEffectCollection, sideEffectWrapper, "side-effect");

  // For categories
  Object.values(categoryCollection).map((el: any) => {
    const type = el.children[2].innerText;
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    switch (type) {
      case "Eat":
        addOption(eatSelector, value, name);
        break;
      case "Move":
        addOption(moveSelector, value, name);
        break;
      case "Live":
        const liveBox = addCheckBox(value, name, "live");
        liveSelector.appendChild(liveBox);
        break;
      default:
        break;
    }
  });
};
