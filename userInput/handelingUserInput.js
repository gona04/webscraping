import natural from "natural";
import callingScaper from "../scraping/callingNewsPortals.js";
import fs from "fs";

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

callingScaper().then(data => {
    const hindu = data[0].data;
    const factChecking = data[1].data;

    hindu.forEach(h => {
      let cleanHeadline = cleaningingInput(h.title)
      headlines.push(cleanHeadline);
    })
    factChecking.forEach(f => {
      let cleanHeadline = cleaningingInput(f.title)
      headlines.push(cleanHeadline);
    })

      // Save headlines to a JSON file
      fs.writeFile("headlines.json", JSON.stringify(headlines, null, 2), (err) => {
        if (err) {
            console.error("Error saving headlines to file:", err);
        } else {
            console.log("Headlines saved to headlines.json");
        }
    });
}).catch(error => {
    console.log(error);
})

// Load and preprocess headlines
export function loadHeadlines() {
  const rawData = fs.readFileSync("headlines.json", "utf-8");
  const headlines = JSON.parse(rawData);
  return headlines.map(cleaningingInput); // Clean the headlines
}
