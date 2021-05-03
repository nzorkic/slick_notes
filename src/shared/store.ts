/// <reference types="chrome"/>

import { writable } from "svelte/store";

export const token = writable(localStorage.getItem("token") || "");
export const active = writable(localStorage.getItem("active") || "");
export const rootDrive = writable("");

const storageFiles = localStorage.getItem("files");
export const files = writable(storageFiles ? JSON.parse(storageFiles) : []);

const storageDocuments = localStorage.getItem("documents");
export const documents = writable(
  storageDocuments ? JSON.parse(storageDocuments) : []
);

token.subscribe((value) => {
  localStorage.setItem("token", value);
  chrome.storage.local.set({ token: value });
});
active.subscribe((value) => {
  localStorage.setItem("active", value);
  chrome.storage.local.set({ active: value });
});
files.subscribe((value) => {
  localStorage.setItem("files", JSON.stringify(value));
});
documents.subscribe((value) => {
  localStorage.setItem("documents", JSON.stringify(value));
});
