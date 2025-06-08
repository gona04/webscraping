import axios from "axios";
import * as cheerio from "cheerio";

const alternativeScraper = async (url, element) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to scraper.");
  }

  try {
    // Fetch the HTML
    const { data: html } = await axios.get(url, { timeout: 60000 });
    const $ = cheerio.load(html);

    // Extract news data
    let articles = [];
    $(element).each((_, item) => {
      const anchor = $(item).find("a").first();
      const rawText = anchor.text() || "";
      const title = rawText
        .replace(/\s*-\s*/g, " - ") // Normalize dash spacing
        .replace(/\s+/g, " ") // Collapse all whitespace
        .trim();

      const link = anchor.attr("href") || "";
      const time = $(item).find(".timePublished").attr("data-published") || "";

      articles.push({ title, link, time });
    });

    return articles;
  } catch (error) {
    console.error("Error occurred while scraping:", error.message);
    return [];
  }
};

export default alternativeScraper;