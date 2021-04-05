import { writable } from "svelte/store";

export const token = writable(localStorage.getItem("token") || "");
export const active = writable(localStorage.getItem("active") || "");

token.subscribe((value) => {
  localStorage.setItem("token", value);
  chrome.storage.local.set({ token: value });
});
active.subscribe((value) => {
  localStorage.setItem("active", value);
  chrome.storage.local.set({ active: value });
});
