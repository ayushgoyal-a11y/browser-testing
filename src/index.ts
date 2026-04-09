import { connect } from "rebrowser-puppeteer-core";
import { getPage } from "./browser/getPage";
import { initBrowser, getBrowserInstance } from "./browser/initBrowser";
import * as dotenv from "dotenv";

dotenv.config();

let browserWSEndpoint: string | null = null;

if (!process.env.IS_LOCAL) {
  // Launch browser at cold start and store WS endpoint
  console.log("Cold start: launching browser");
  initBrowser({})
    .then((browser) => {
      browserWSEndpoint = browser.wsEndpoint();
      console.log(
        "Browser launched in init phase, WS endpoint:",
        browserWSEndpoint,
      );
    })
    .catch((err) => {
      console.error("Failed to launch browser in init:", err);
    });
}

export const handler = async () => {
  let browser;

  console.log("Handler invoked, connecting to browser...");
  console.log(
    process.env.IS_LOCAL
      ? "Running in local mode"
      : "Running in production mode",
  );
  if (process.env.IS_LOCAL) {
    // Use the browser instance launched in dev.ts
    browser = getBrowserInstance();
    if (!browser) {
      throw new Error("Browser not launched in dev");
    }
  } else {
    // Wait for browser to be launched if not yet
    while (!browserWSEndpoint) {
      console.log("Waiting for browser to launch...");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log("Connecting to browser via WS endpoint:", browserWSEndpoint);
    browser = await connect({ browserWSEndpoint });
  }

  console.log("Connected to browser");

  let page;

  try {
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
    // Close page, disconnect browser
    console.log("Cleaning up page and disconnecting browser");
    if (page) await page.close().catch(() => {});
    if (browser && !process.env.IS_LOCAL)
      await browser.disconnect().catch(() => {});
  }
};
