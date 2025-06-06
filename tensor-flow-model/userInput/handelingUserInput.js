import natural from "natural";
import callingScaper from "../scraping/callingNewsPortals.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const userInput = "Trump says he resorted the India Pakistan war";
const stopwords = [
  "a", "an", "the", "is", "to", "about", "and", "or", "in", "on", "for", "of", "with", "at", "by", "from", "up", "down", "out", "over", "under"
];
const stemmer = natural.PorterStemmer;
let headlines = [];

export function cleaningingInput(input) {
  // Convert input to lowercase and remove punctuation
  let cleanInput = input
      .toLowerCase() // Convert to lowercase
      .replace(/[?.,!]/g, "") // Remove punctuation
      .split(/\s+/); // Split into words

  // Remove stopwords and apply stemming
  cleanInput = cleanInput
      .filter(word => !stopwords.includes(word)) // Remove stopwords
      .map(word => stemmer.stem(word)); // Apply stemming

  // Remove duplicate words
  let uniqueWords = [...new Set(cleanInput)];

  // Join the cleaned words back into a single string
  return uniqueWords.join(" ");
}

// Scrape and save both neutralized and unNeutralized headlines
export async function scrapeAndSaveHeadlines() {
  const data = await callingScaper();
  const hindu = data[0].data;
  const factChecking = data[1].data;

  const neutralized = [];
  const unNeutralized = [];

  hindu.forEach(h => {
    neutralized.push(cleaningingInput(h.title));
    unNeutralized.push(h.title);
  });
  factChecking.forEach(f => {
    neutralized.push(cleaningingInput(f.title));
    unNeutralized.push(f.title);
  });

  // Save both arrays
  fs.writeFileSync(path.join(__dirname, "../scraped_data/headlines.json"), JSON.stringify(neutralized, null, 2));
  fs.writeFileSync(path.join(__dirname, "../scraped_data/unNeutralizedHeadlines.json"), JSON.stringify(unNeutralized, null, 2));
}

// Load neutralized headlines
export function loadHeadlines() {
  const rawData = fs.readFileSync(path.join(__dirname, "../scraped_data/headlines.json"), "utf-8");
  return JSON.parse(rawData);
}

// Load unNeutralized headlines
export function loadUnNeutralizedHeadlines() {
  const rawData = fs.readFileSync(path.join(__dirname, "../scraped_data/unNeutralizedHeadlines.json"), "utf-8");
  return JSON.parse(rawData);
}

