// Get Collections
export const cancerType = document.getElementsByClassName("cancer-type-item");
export const cancerStage = document.getElementsByClassName("cancer-stage-item");
export const treatmentType = document.getElementsByClassName(
  "treatment-type-item"
);
export const treatmentStage = document.getElementsByClassName(
  "treatment-stage-item"
);
export const sideEffect = document.getElementsByClassName("side-effect-item");
export const category = document.getElementsByClassName("category-item");
export const lifestyle = document.getElementsByClassName("lifestyle-item");
export const job = document.getElementsByClassName("job-item");

// Get Collection Page Item
export const cpItem = document.getElementsByClassName("collection-page-item");

// For Defaults Values
// For Professional Page
export const getCurrentPro = () => {
  const listElements = Array.from(cpItem[0].children) as HTMLDivElement[];
  return {
    firstName: listElements[0]?.innerText || "",
    lastName: listElements[1]?.innerText || "",
    bio: listElements[2]?.innerText || "",
    phone: listElements[3]?.innerText || "",
    postCode: listElements[4]?.innerText || "",
    street: listElements[5]?.innerText || "",
    website: listElements[6]?.innerText || "",
    itemId: listElements[7]?.innerText || "",
    "selected-lifestyles": listElements[8]?.innerText || "",
    "selected-categories": listElements[9]?.innerText || "",
  };
};

// For User Page
export const getCurrentUser = () => {
  const listElements = Array.from(cpItem[0].children) as HTMLDivElement[];
  return {
    firstName: listElements[0]?.innerText || "",
  };
};
