import puppeteer from "puppeteer";

const scraper = async (url, element) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to scraper.");
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Optional: capture screenshot
  await page.screenshot({ path: 'screenshot.png' });

  // Wait for the Latest News section
  await page.waitForSelector(element);

  // Extract news data
  const articles = await page.$$eval(element, items =>
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

  // console.log(articles);

  await browser.close();
  return await articles;
};


export default scraper;
