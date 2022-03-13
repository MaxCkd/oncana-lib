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
const listElements = Array.from(cpItem[0].children) as HTMLDivElement[];

// For Defautls Values
// For Professional Page
export const pro = {
  firstName: listElements[0].innerText,
  // bio: listElements[1].innerText,
  // lastName: listElements[2].innerText,
  // phone: listElements[3].innerText,
  // postCode: listElements[4].innerText,
  // street: listElements[5].innerText,
  // website: listElements[6].innerText,
  // job: listElements[7].innerText,
  lifestyles: listElements[3].innerText,
  // categories: listElements[9].innerText,
};
// For User Page
export const user = {
  firstName: listElements[0].innerText,
};
