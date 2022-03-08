import * as selector from "./selectors";
import * as collection from "./collections";
import { submitOnboardingForm } from "./onboardingForm";
import {
  mapCollectionSelector,
  mapCollectionCheckBox,
  addOption,
  addCheckBox,
} from "./createFields";

const createFieldsFromCollections = () => {
  mapCollectionSelector(collection.treatmentType, selector.treatmentType);
  mapCollectionSelector(collection.treatmentStage, selector.treatmentStage);
  mapCollectionSelector(collection.cancerType, selector.cancerType);
  mapCollectionSelector(collection.cancerStage, selector.cancerStage);
  mapCollectionCheckBox(
    collection.sideEffect,
    selector.sideEffectWrapper,
    "side-effect"
  );

  // For categories
  Object.values(collection.category).map((el: any) => {
    const type = el.children[2].innerText;
    const value = el.children[0].innerText;
    const name = el.children[1].innerText;
    switch (type) {
      case "Eat":
        addOption(selector.eat, value, name);
        break;
      case "Move":
        addOption(selector.move, value, name);
        break;
      case "Live":
        const liveBox = addCheckBox(value, name, "live");
        selector.live.appendChild(liveBox);
        break;
      default:
        break;
    }
  });
};

export { selector, submitOnboardingForm, createFieldsFromCollections };
