/// <reference types="chrome"/>

import { writable } from "svelte/store";

export const token = writable(localStorage.getItem("token") || "");
export const active = writable(localStorage.getItem("active") || "");
export const rootDrive = writable("");

const storageDocs = localStorage.getItem("documents");
export const documents = writable(storageDocs ? JSON.parse(storageDocs) : []);

token.subscribe((value) => {
  localStorage.setItem("token", value);
  chrome.storage.local.set({ token: value });
});
active.subscribe((value) => {
  localStorage.setItem("active", value);
  chrome.storage.local.set({ active: value });
});
documents.subscribe((value) => {
  localStorage.setItem("documents", JSON.stringify(value));
});
