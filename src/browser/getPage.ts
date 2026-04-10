import { Browser, Page } from "rebrowser-puppeteer-core";
const defaultTimeout = 120_000; // 120 seconds

export const getPage = async (browser: Browser): Promise<Page> => {
  const page = await browser.newPage();

  // Set safe timeouts
  page.setDefaultNavigationTimeout(defaultTimeout);
  page.setDefaultTimeout(defaultTimeout);

  return page;
};
