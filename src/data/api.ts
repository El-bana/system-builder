import type { BuilderData } from "../types";

// promise so we can consume at the compoenents
export const builderDataPromise = fetch("/api/builder")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => data as BuilderData);
