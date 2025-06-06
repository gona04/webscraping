import puppeteer from "puppeteer";

const scraper = async (url, element) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to scraper.");
  }

  let browser;
  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the URL
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (error) {
      console.error(`Error navigating to URL: ${url}`, error.message);
      return []; // Return an empty array if navigation fails
    }

    // Optional: capture screenshot for debugging
    await page.screenshot({ path: 'screenshot.png' });

    // Wait for the selector
    try {
      await page.waitForSelector(element, { timeout: 60000 });
    } catch (error) {
      console.error(`Error: Selector '${element}' not found on ${url}`, error.message);
      return []; // Return an empty array if the selector is not found
    }

    // Extract news data
    let articles = [];
    try {
      articles = await page.$$eval(element, items =>
        items.map(item => {
          const anchor = item.querySelector('a');
          const rawText = anchor?.textContent || '';
          const title = rawText
            .replace(/\s*-\s*/g, ' - ')  // Normalize dash spacing
            .replace(/\s+/g, ' ')        // Collapse all whitespace
            .trim();                     // Final clean-up

          const link = anchor?.href || '';
          const time = item.querySelector('.timePublished')?.getAttribute('data-published') || '';

          return { title, link, time };
        })
      );
    } catch (error) {
      console.error(`Error extracting data from selector '${element}' on ${url}`, error.message);
      return []; // Return an empty array if data extraction fails
    }

    console.log("Extracted Articles:", articles); // Debugging log
    return articles;

  } catch (error) {
    console.error("Error occurred while scraping:", error.message);
    return []; // Return an empty array if any other error occurs
  } finally {
    if (browser) {
      await browser.close(); // Ensure the browser is closed
    }
  }
};

export default scraper;