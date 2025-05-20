import callingScaper from "./hindu.js";

const main = async () => {
  console.log("Starting all scrapers...");

  try {
    await callingScaper(); // Run The Hindu scraper
  } catch (error) {
    console.error("Error occurred while running scrapers:", error);
  }

  console.log("All scrapers completed.");
};

main();