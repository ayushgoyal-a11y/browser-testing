// browser.ts
import { launch, Browser } from "rebrowser-puppeteer-core";
import { getSparticuzConfig } from "./sparticuzConfig/index.js";
import { getPage } from "./getPage.js";

global.browserInstance = null;
global.pageInstance = null;
global.messages = [];

export const initBrowser = async (): Promise<Browser> => {
  if (global.browserInstance) {
    console.log("Browser already initialized");
    return global.browserInstance;
  }

  try {
    console.log(
      "Launching browser with headless =",
      process.env.NODE_ENV === "PROD",
    );
    const config = await getSparticuzConfig();
    console.log("Config ready, launching...");

    global.browserInstance = await launch(config);
    console.log("Browser launched:", global.browserInstance);

    const page = await getPage(global.browserInstance);
    console.log("Page instance created:", global.pageInstance);

    await page.goto("https://www.youtube.com/", {
      waitUntil: "load",
      timeout: 15000,
    });

    global.pageInstance = page;
    return global.browserInstance;
  } catch (err) {
    console.error("Error launching browser:", err);
    throw err;
  }
};

export const getBrowserInstance = () => global.browserInstance;
export const getPageInstance = () => global.pageInstance;
