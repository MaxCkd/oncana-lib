import { getCollectionsApi, headers } from "./config";
import { Collections, Item, Resp } from "./type";

export const getCollectionsForm = async (): Promise<Resp> => {
  // Get Collection Items names and Ids from our API
  const res = await fetch(getCollectionsApi, {
    method: "GET",
    headers,
  });

  const data = await res.json();
  if (res.ok) {
    console.log("DATA", data);

    return data;
  } else {
    const error = new Error(data);
    return Promise.reject(error);
  }
};

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
const sideEffectSelector = document.getElementById(
  "select-side-effect"
) as HTMLSelectElement;
const eatSelector = document.getElementById("select-eat") as HTMLSelectElement;
const moveSelector = document.getElementById(
  "select-move"
) as HTMLSelectElement;
const liveSelector = document.getElementById(
  "select-live"
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

const mapCollectionSelector = (
  collection: HTMLCollectionOf<any>,
  selector: HTMLSelectElement
) => {
  Object.values(collection).map((el) => {
    addOption(selector, el.children[0].innerText, el.children[1].innerText);
  });
};

const createFromCollection = () => {
  mapCollectionSelector(treatmentTypeCollection, treatmentTypeSelector);
  mapCollectionSelector(treatmentStageCollection, treatmentStageSelector);
  mapCollectionSelector(cancerTypeCollection, cancerTypeSelector);
  mapCollectionSelector(cancerStageCollection, cancerStageSelector);
  mapCollectionSelector(sideEffectCollection, sideEffectSelector);

  // For categories
  Object.values(categoryCollection).map((el: any) => {
    const type = el.children[2].innerText;
    switch (type) {
      case "Eat":
        addOption(
          eatSelector,
          el.children[0].innerText,
          el.children[1].innerText
        );
        break;
      case "Move":
        addOption(
          moveSelector,
          el.children[0].innerText,
          el.children[1].innerText
        );
        break;
      case "Live":
        addOption(
          liveSelector,
          el.children[0].innerText,
          el.children[1].innerText
        );
        break;
      default:
        break;
    }
  });
};

const mapNewCollectionSelector = (
  items: Item[],
  selector: HTMLSelectElement
) => {
  items.map((el) => {
    addOption(selector, el.name, el._id);
  });
};

export const populateSelectFields = async (collections: Collections) => {
  // Populate the Form fields
  mapNewCollectionSelector(collections.sideEffects.items, sideEffectSelector);
};

export const populateCheckboxes = async (collections: Collections) => {
    
};
