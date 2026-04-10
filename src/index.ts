import { getPage } from "./browser/getPage";
import { initBrowser, getBrowserInstance } from "./browser/initBrowser";
import * as dotenv from "dotenv";

dotenv.config();

(async function init() {
  console.log("launching browser in init phase");
  await initBrowser({});
})();

export const handler = async () => {
  console.log("Handler invoked, connecting to browser...");
  console.log(
    process.env.NODE_ENV === "DEV"
      ? "Running in local mode"
      : "Running in production mode",
  );

  let browser = getBrowserInstance();

  let retry = 0;
  while (!browser && retry < 10) {
    console.log("Browser not connected. Retrying...", { retry });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    browser = getBrowserInstance();
    retry++;
  }

  if (!browser) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Browser not connected" }),
    };
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
    if (browser && process.env.NODE_ENV !== "DEV")
      await browser.disconnect().catch(() => {});
  }
};
