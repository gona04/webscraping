import scraper from "./scraper.js";

const newsPortals = [
  {
    name: "Hindu",
    element: 'div[data-ga-label="Latest News"] ul.timeline li',
    url: "https://www.thehindu.com/",
  },
  {
    name: "FactCheck",
    url: "https://www.factcheck.org/the-factcheck-wire/",
    element: "article.post",
  },
];

const callingScaper = async () => {
  try {
    // Use Promise.all to wait for all scraper calls to resolve
    const data = await Promise.all(
      newsPortals.map(async (article) => {
        const scrapedData = await scraper(article.url, article.element);
        return { name: article.name, data: scrapedData };
      })
    );
    return data; // Return the collected data
  } catch (error) {
    console.error("Error occurred while scraping:", error);
    return [];
  }
};

export default callingScaper;