import puppeteer from "rebrowser-puppeteer-core";
import { automate } from "./automate.js";
import { getPage } from "./browser/getPage.js";
import {
  initBrowser,
  getBrowserInstance,
  getPageInstance,
} from "./browser/initBrowser.js";
import * as dotenv from "dotenv";

dotenv.config();

let isColdStart = true;
let initError: Error | null = null;
let intervalId: NodeJS.Timeout | null = null;

// try {
//   console.log("launching browser in init phase");
//   let count = 0;
//   intervalId = setInterval(() => {
//     global.messages.push(count);
//     count++;
//   }, 100);
//   await initBrowser();
// } catch (err) {
//   initError = err as Error;
//   console.error("Init failed:", initError.message);
// }

export const handler = async () => {
  if (isColdStart) {
    console.log("❄️ Cold start");
    isColdStart = false;
  } else {
    console.log("🔥 Warm start");
  }

  const length = global.messages ? global.messages.length : 0;
  console.log("Messages length:", length);

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    global.messages = [];
  }

  console.log("Handler invoked, connecting to browser...");
  console.log(
    process.env.NODE_ENV === "DEV"
      ? "Running in local mode"
      : "Running in production mode",
  );

  //   let browser = getBrowserInstance();

  const url =
    "wss://milton-availability-generates-thriller.trycloudflare.com/devtools/browser/71c7485a-6ee7-4cf8-86db-12a163f9a093";

  let browser = await puppeteer.connect({
    browserWSEndpoint: url,
  });

  let retry = 0;
  while (!browser && retry < 100) {
    console.log("Browser not connected. Retrying...", { retry });
    await new Promise((resolve) => setTimeout(resolve, 100));
    // browser = getBrowserInstance();
    browser = await puppeteer.connect({
      browserWSEndpoint: url,
    });
    retry++;
  }

  if (!browser) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Browser not connected" }),
    };
  }

  console.log("Connected to browser");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let page;

  try {
    // Use safe getPage that closes old pages
    page = await getPageInstance();
    if (!page) {
      console.log("No existing page instance, creating new one...");
      page = await getPage(browser);
    } else {
      console.log("Reusing existing page instance");
    }
    console.log("Page opened");

    // await page.goto("https://example.com", {
    //   waitUntil: "domcontentloaded",
    //   timeout: 10000,
    // });
    // console.log("Page loaded");
    // const title = await page.title();

    await automate(page);

    return { statusCode: 200, body: JSON.stringify({ title: "success" }) };
  } catch (err: any) {
    // Reset globals if browser died
    console.error("Browser error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  } finally {
    // Close page only - keep browser alive for reuse on warm starts
    console.log("Cleaning up page");
    // if (page && !page.isClosed()) await page.close();
  }
};
