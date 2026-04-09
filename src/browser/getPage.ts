import { Browser, Page } from "rebrowser-puppeteer-core";
const defaultTimeout = 120_000; // 120 seconds

export const closePages = async (browser: Browser) => {
  const pages = await browser.pages();
  for (const page of pages) {
    try {
      await page.close();
    } catch (_) {
      // ignore already closed or error pages
    }
  }
};

export const getPage = async (browser: Browser): Promise<Page> => {
  await closePages(browser);

  await closePages(browser);

  // Create a fresh page
  const page = await browser.newPage();

  // Set safe timeouts
  page.setDefaultNavigationTimeout(defaultTimeout);
  page.setDefaultTimeout(defaultTimeout);

  return page;
};
