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

export interface OnboardingFormElements extends HTMLFormControlsCollection {
  "webflow-id": HTMLInputElement;
  "first-name": HTMLInputElement;
  "last-name": HTMLInputElement;
  dob: HTMLInputElement;
  postcode: HTMLInputElement;
  pic?: HTMLInputElement;
  gender: HTMLSelectElement;
  "cancer-type"?: HTMLSelectElement;
  "cancer-stage"?: HTMLSelectElement;
  "treatment-type"?: HTMLSelectElement;
  "treatment-stage"?: HTMLSelectElement;
  eat?: HTMLSelectElement;
  move?: HTMLSelectElement;
}

export type OncanaUser = {
  "webflow-id": string;
  "first-name": string;
  "last-name": string;
  gender: string;
  dob: string;
  postcode: string;
  "treatment-stage": string;
  "treatment-type": string;
  "cancer-stage": string;
  "cancer-type": string;
  eat: string;
  move: string;
  live: string[];
  "side-effects": string[];
  image?: string | null;
};
