import { writable } from "svelte/store";

export const token = writable(localStorage.getItem("token") || "");
export const active = writable(localStorage.getItem("active") || "");

<<<<<<< HEAD
=======
const storageDocs = localStorage.getItem("documents");
export const documents = writable(storageDocs ? JSON.parse(storageDocs) : []);

>>>>>>> 0deac32 (test)
token.subscribe((value) => {
  localStorage.setItem("token", value);
  chrome.storage.local.set({ token: value });
});
active.subscribe((value) => {
  localStorage.setItem("active", value);
  chrome.storage.local.set({ active: value });
});
<<<<<<< HEAD
=======
documents.subscribe((value) => {
  localStorage.setItem("documents", JSON.stringify(value));
  chrome.storage.local.set({ documents: JSON.stringify(value) });
});
>>>>>>> 0deac32 (test)
