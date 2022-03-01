export interface Item {
  _archived: boolean;
  _draft: boolean;
  name: string;
  slug: string;
  "updated-on": string;
  "updated-by": string;
  "created-on": string;
  "created-by": string;
  "published-on": string;
  "published-by": string;
  "item-id": string;
  _cid: string;
  _id: string;
}

export interface Collections {
  sideEffects: { items: Item[] };
  cancerTypes: { items: Item[] };
  cancerStages: { items: Item[] };
  treatmentStages: { items: Item[] };
  treatmentTypes: { items: Item[] };
  oncanaCategories: { items: Item[] };
}

export type Resp = {
  message: string;
  result: Collections;
};

export interface OnboardingFormElements extends HTMLFormControlsCollection {
  "webflow-id": HTMLInputElement;
  "first-name": HTMLInputElement;
  "last-name": HTMLInputElement;
  dob: HTMLInputElement;
  pic: HTMLInputElement;
  gender: HTMLSelectElement;
  "side-effect": HTMLSelectElement;
}

export type WebflowUser = {
  "webflow-id": string;
  "first-name": string;
  "last-name": string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  postcode: string;
  "treatment-stages": string[];
  "treatment-types": string[];
  "cancer-stage": string;
  "cancer-type": string;
  "oncana-categories": string[];
  "side-effects": string[];
  image?: string | null;
};
