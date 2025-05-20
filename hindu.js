import scraper from "./scraper.js";

const newsPortals = [
  {
    name: 'Hindu',
    element: 'div[data-ga-label="Latest News"] ul.timeline li',
    url: "https://www.thehindu.com/",
  },
 {
    name: 'FactCheck',
    url: "https://www.factcheck.org/the-factcheck-wire/",
    element: "article.post",
  },
];
const callingScaper = async () => {
  try {
    newsPortals.forEach(article => {
        const a = scraper(article.url, article.element);
        console.log(`Scraped articles from ${article.name}:`, article);
    })
  } catch (error) {
    console.error("Error occurred while scraping FactCheck:", error);
  }
};

export default callingScaper;
