import Fuse from "fuse.js";

export function fuzzyFilterHeadlines(userInput, headlines, limit = 1) {
  const fuse = new Fuse(headlines, {
    includeScore: true,
    threshold: 0.5 // Lower = stricter, higher = fuzzier (0.3–0.5 is typical)
  });

  const results = fuse.search(userInput);
  return results.slice(0, limit); 
}