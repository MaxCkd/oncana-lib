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
  const img = listElements[13] as HTMLImageElement;
  return {
    firstName: listElements[0]?.innerText || "",
    lastName: listElements[1]?.innerText || "",
    bio: listElements[2]?.innerText || "",
    phone: listElements[3]?.innerText || "",
    postCode: listElements[4]?.innerText || "",
    website: listElements[5]?.innerText || "",
    itemId: listElements[6]?.innerText || "",
    "selected-lifestyles": listElements[7]?.innerText || "",
    "selected-categories": listElements[8]?.innerText || "",
    jobTitle: listElements[9]?.innerText || "",
    job: listElements[10]?.innerText || "",
    "selected-side-effects": listElements[11]?.innerText || "",
    image: img?.src || "",
    email: listElements[13]?.innerText || "",
    address: listElements[14]?.innerText || "",
    displayName: listElements[15]?.innerText || "",
    directoryId: listElements[16]?.innerText || "",
  };
};

// For User Page
export const getCurrentUser = () => {
  const listElements = Array.from(cpItem[0].children) as HTMLDivElement[];
  return {
    firstName: listElements[0]?.innerText || "",
    lastName: listElements[1]?.innerText || "",
    gender: listElements[2]?.innerText || "",
    cancerStage: listElements[3]?.innerText || "",
    cancerType: listElements[4]?.innerText || "",
    "selected-side-effects": listElements[5]?.innerText || "",
    "selected-categories": listElements[6]?.innerText || "",
    email: listElements[7]?.innerText || "",
    dob: listElements[8]?.innerText || "",
    postcode: listElements[9]?.innerText || "",
    treatmentType: listElements[10]?.innerText || "",
    treatmentStage: listElements[11]?.innerText || "",
  };
};
