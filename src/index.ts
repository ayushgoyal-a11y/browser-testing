import { getPage } from "./browser/getPage";
import { getBrowserWSEndpoint, initBrowser } from "./browser/initBrowser";
import * as dotenv from "dotenv";

dotenv.config();

const browserPromise = initBrowser({}); // Prelaunch browser at cold start

export const handler = async () => {
  const browserWSEndpoint = getBrowserWSEndpoint();
  if (!browserWSEndpoint) {
    throw new Error("Browser not available");
  }
  console.log("Browser WS Endpoint:", browserWSEndpoint);

  let browser;
  let page;

  try {
    // browser = await connect({ browserWSEndpoint });
    browser = await browserPromise; // Use prelaunched browser
    console.log("Connected to browser");

    // Use safe getPage that closes old pages
    page = await getPage(browser);
    console.log("Page opened");

    await page.goto("https://example.com", {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });
    console.log("Page loaded");
    const title = await page.title();

    return { statusCode: 200, body: JSON.stringify({ title }) };
  } catch (err: any) {
    // Reset globals if browser died
    console.error("Browser error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  } finally {
    // Close browser and page
    console.log("Cleaning up browser and page");
    if (page) await page.close().catch(() => {});
    if (browser) await browser.disconnect().catch(() => {});
  }
};
