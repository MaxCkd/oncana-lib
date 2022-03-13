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

export interface UserFormElements extends HTMLFormControlsCollection {
  "first-name": HTMLInputElement;
  "last-name": HTMLInputElement;
  dob: HTMLInputElement;
  postcode: HTMLInputElement;
  gender: HTMLSelectElement;
  "cancer-type": HTMLSelectElement;
  "cancer-stage": HTMLSelectElement;
  "treatment-type": HTMLSelectElement;
  "treatment-stage": HTMLSelectElement;
  eat: HTMLSelectElement;
  move: HTMLSelectElement;
}
export interface ProFormElements extends HTMLFormControlsCollection {
  "first-name": HTMLInputElement;
  "last-name": HTMLInputElement;
  picture: HTMLInputElement;
  job: HTMLSelectElement;
  "job-title": HTMLInputElement;
  bio: HTMLTextAreaElement;
  address: HTMLInputElement;
  website: HTMLInputElement;
  phone: HTMLInputElement;
  email: HTMLInputElement;
}

type User = {
  "first-name": string;
  "last-name": string;
  email: string;
  "webflow-id": string;
  "memberstack-id": string;
};

export interface UpdateUserData extends User {
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
}

export interface UpdateProData extends User {
  "memberstack-id": string;
  "webflow-id": string;
  "first-name": string;
  "last-name": string;
  bio: string;
  job: string;
  "job-title": string;
  // email: string;
  phone: string;
  website: string;
  address: string;
  image: string;
  lifestyles: string[];
  "side-effects": string[];
}
